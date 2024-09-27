const Accident = require("../models/accidentModel");
const BaseRepository = require("./baseRepository");

class AccidentRepository extends BaseRepository {

  async getAllAccidentsSortedByDateAsc() {

    const accidents = await Accident.find().sort({ date: 'asc' });
    return accidents;

  }
  async getAllAccidentsSortedByDateDesc() {

    const accidents = await Accident.find().sort({ date: 'desc' });
    return accidents;

  }
  async getAccidentsByDate(startDate, endDate) {

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);


    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      throw new Error("Geçersiz tarih formatı");
    }


    const accidents = await this.model.find({
      date: { $gte: startDateTime, $lt: endDateTime }
    });

    return accidents;
  }

  async filterAccidentsByTime(hour, minute) {

    const startTime = new Date();
    startTime.setHours(hour, minute, 0, 0);

    const endTime = new Date();
    endTime.setHours(hour, minute, 59, 999);

    const accidents = await Accident.find({
      time: {
        $gte: startTime.toISOString(),
        $lte: endTime.toISOString(),
      },
    });

    return accidents;

  }
  async getAccidentsGroupedByWeather() {
      const pipeline = [
        {
          $group: {
            _id: "$weather",
            data: {
              $push: {
                id: "$date", // Eğer "$date" zaten bir string ise, direkt kullanabilirsiniz
                count: 1,
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            data: 1,
          },
        },
      ];
    
      const result = await this.model.aggregate(pipeline);
      return result;
  }
  
  async getAccidentCountsByMonth() {
    const pipeline = [
      {
        $project: {
          month: { $month: { $dateFromString: { dateString: '$date' } } },
          deathCount: '$deathCount',
          injuryCount: '$injuryCount',
  
        },
      },
      {
        $group: {
          _id: '$month',
          deathCount: { $sum: '$deathCount' },
          injuryCount: { $sum: '$injuryCount' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];
  
    const result = await this.model.aggregate(pipeline);
    return result;
  }
  async groupByStreet() {
    const aggregateQuery = [
      {
        $lookup: {
          from: 'districts',
          localField: 'district',
          foreignField: '_id',
          as: 'districtInfo',
        },
      },
      {
        $unwind: '$districtInfo',
      },
      {
        $group: {
          _id: '$districtInfo.streetName',
          totalAccidents: { $sum: 1 },
          totalDeathCount: { $sum: '$deathCount' },
          totalInjuryCount: { $sum: '$injuryCount' },
          coordinates: { $first: '$districtInfo.location.coordinates' },
        },
      },
      {
        $project: {
          _id: 0, // _id'yi çıkartabilirsiniz, çünkü zaten streetName'e göre grupluyorsunuz
          streetName: '$_id', // _id yerine streetName kullanabilirsiniz
          totalAccidents: 1,
          totalDeathCount: 1,
          totalInjuryCount: 1,
          coordinates: 1,
        },
      },
    ];
  
    const result = await Accident.aggregate(aggregateQuery);
    return result;
  }
  async groupByDistrict(){
    const pipeline = [
      {
        $lookup: {
          from: 'districts',
          localField: 'district',
          foreignField: '_id',
          as: 'districtInfo',
        },
      },
      {
        $unwind: '$districtInfo',
      },
      {
        $group: {
          _id: '$districtInfo.districtName',
          totalAccidents: { $sum: 1 },
          totalDeathCount: { $sum: '$deathCount' },
          totalInjuryCount: { $sum: '$injuryCount' },
        },
      },
      {
        $project: {
          _id: 0,
          districtName: '$_id',
          totalAccidents: 1,
          totalDeathCount: 1,
          totalInjuryCount: 1,
        },
      },
    ];
    
    const result = await Accident.aggregate(pipeline);
    return result; 
  }
  async getAccidentsMapData() {

    const groupedStreets = await this.groupByStreet();

    // Eksik veri kontrolü
    if (!groupedStreets || groupedStreets.length === 0) {
      console.error('No data available for map.');
      return [];
    }

    const mapData = {
      type: 'FeatureCollection',
      features: groupedStreets.map((district) => {
        // Eksik veri kontrolü
        if (!district.coordinates || !district.streetName) {
          console.error('Missing data for district:', district);
          return null;
        }

        // GeoJSON feature formatına dönüştür
        return {
          type: 'Feature',
          properties: {
            name: district.streetName,
            totalAccidents: district.totalAccidents || 0,
            totalDeathCount: district.totalDeathCount || 0,
            totalInjuryCount: district.totalInjuryCount || 0,
          },
          geometry: {
            type: 'Point',
            coordinates: district.coordinates,
          },
        };
      }),
    };

    // Eksik verileri filtrele
    const filteredMapData = mapData.features.filter((data) => data !== null);

    return filteredMapData;
  
  }
  async getAccidentsLastThreeDays() {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const pipeline = [
      {
        $match: {
          date: { $gte: threeDaysAgo.toISOString() }
        }
      },
      {
        $group: {
          _id: null,
          accidents: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          accidents: 1
        }
      }
    ];

    const result = await this.model.aggregate(pipeline);

    return result.length > 0 ? result[0].accidents : [];
  }
  async getAccidentsStatisticsLastThreeDays() {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const pipeline = [
      {
        $match: {
          date: { $gte: threeDaysAgo.toISOString() }
        }
      },
      {
        $group: {
          _id: null,
          totalAccidents: { $sum: 1 },
          totalDeathCount: { $sum: "$deathCount" },
          totalInjuryCount: { $sum: "$injuryCount" }
        }
      },
      {
        $project: {
          _id: 0,
          totalAccidents: 1,
          totalDeathCount: 1,
          totalInjuryCount: 1
        }
      }
    ];

    const result = await this.model.aggregate(pipeline).allowDiskUse(true); // Bu satırı ekledim

    return result.length > 0 ? result[0] : {
      totalAccidents: 0,
      totalDeathCount: 0,
      totalInjuryCount: 0
    };
  }
  async getTotalAccidentStatistics() {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalAccidents: { $sum: 1 },
          totalDeathCount: { $sum: "$deathCount" },
          totalInjuryCount: { $sum: "$injuryCount" },
        },
      },
      {
        $project: {
          _id: 0,
          totalAccidents: 1,
          totalDeathCount: 1,
          totalInjuryCount: 1,
        },
      },
    ];
  
    const result = await this.model.aggregate(pipeline).allowDiskUse(true);
  
    return result.length > 0
      ? result[0]
      : {
          totalAccidents: 0,
          totalDeathCount: 0,
          totalInjuryCount: 0,
        };
  }


}
module.exports = new AccidentRepository(Accident);
