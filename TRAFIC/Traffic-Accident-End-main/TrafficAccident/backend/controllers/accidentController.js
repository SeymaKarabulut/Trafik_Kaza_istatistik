const AccidentRepository = require("../repositories/accidentRepository.js");

const getAccidents = async (req, res) => {
  const accidents = await AccidentRepository.getAll({ path: 'district accidentType weather' });
  return res.status(200).json({
    count: accidents.length,
    data: accidents,
  });
};

const createAccident = async(req, res) => {
  const accident = await AccidentRepository.create(req.body);
  if (!accident) {
    return res.status(400).json({ error: 'Bad Request. Accident creation failed.' });
  }
  res.status(201).json(accident);
};

const getAccidentById = async (req, res) => {
  const  id = req.params.id;
  const accident = await AccidentRepository.getById(id,{ path: 'district   weather accidentType' });
  if (!accident) {
    res.status(404);
    throw new Error('Accident not found');
  }
  return res.status(200).json({
    count: accident.length,
    data: accident,
  });
};

const updateAccident = async (req, res) => {
  const  id  = req.params.id;
  const { accidentType,district,date,time,weather, injuryCount,deathCount } = req.body;
  const result = await AccidentRepository.update(id, { accidentType,district,date,time,weather, injuryCount,deathCount  },{ path: 'district weather accidentType' });
  if (!result) {
    res.status(404);
    throw new Error('Accident not found');
  }
  res.status(200).json({ message: 'Accident updated successfully', data: result });
};

const deleteAccident = async (req, res) => {
  const id  = req.params.id;
  const result = await AccidentRepository.delete(id,{ path: 'district weather  accidentType' });
  if (!result) {
    res.status(404);
    throw new Error('Accident not found');
  }
  res.status(200).json({ message: 'Accident deleted successfully', data: result });
};

const getAllAccidentsSortedByDateAsc = async (req, res) => {
  const accidents = await AccidentRepository.getAllAccidentsSortedByDateAsc();
  res.json(accidents);
};

const getAllAccidentsSortedByDateDesc= async (req, res) => {
  const accidents = await AccidentRepository.getAllAccidentsSortedByDateDesc();
  res.json(accidents);
};

const getAccidentsByDate = async (req, res) => {
  const { startDate, endDate } = req.query;
  const accidents = await AccidentRepository.getAccidentsByDate(startDate, endDate);
  res.json(accidents);
};

const accidentCountsByMonth = async (req, res) => {

  const accidentCounts = await AccidentRepository.getAccidentCountsByMonth();
  res.json(accidentCounts);
};


  const getAccidentsGroupedByWeather = async (req, res) => {
    const result = await AccidentRepository.getAccidentsGroupedByWeather();
    const formattedData = result.map(item => ({
      id: item.id,
      data: item.data.reduce((acc, curr) => {
        acc[curr.id] = curr.count;
        return acc;
      }, {}),
    }));
    res.json(formattedData);
  }



const getAccidentsByTime = async (req, res) => {
  const { hour, minute } = req.params;
  const parsedHour = parseInt(hour);
  const parsedMinute = parseInt(minute);
   if (isNaN(parsedHour) || isNaN(parsedMinute) || parsedHour < 0 || parsedHour > 23 || parsedMinute < 0 || parsedMinute > 59) {
      return res.status(400).json({ error: 'Geçersiz saat veya dakika değeri.' });

  }
   const accidents = await AccidentRepository.getAccidentsByTime(parsedHour, parsedMinute);
    res.status(200).json({
      count: accidents.length,
      data: accidents,
    });

}
    
const getAccidentsMapData = async (req, res) => {
 
    const mapData = await AccidentRepository.getAccidentsMapData();
    res.status(200).json({
      count: mapData.length,
      data: mapData,
    });
}

const getAccidentsLastThreeDays = async (req, res) => {

    const accidentsLastThreeDays = await AccidentRepository.getAccidentsLastThreeDays();
    res.status(200).json({
      count: accidentsLastThreeDays.length,
      data: accidentsLastThreeDays,
    });
}
const getAccidentsStatisticsLastThreeDays = async (req, res) => {

    const statisticsLastThreeDays = await AccidentRepository.getAccidentsStatisticsLastThreeDays();
    res.status(200).json(statisticsLastThreeDays);
}
const groupByDistrict = async (req, res) => {
  const accidentStatsByDistrict = await AccidentRepository.groupByDistrict();
  res.status(200).json(accidentStatsByDistrict);
}
const getTotalAccidentStatistics = async (req, res) => {
  const totalAccidentStatistics = await AccidentRepository.getTotalAccidentStatistics();
  res.status(200).json(totalAccidentStatistics);
  
}

module.exports = {
  getAccidents,
  getAllAccidentsSortedByDateAsc,
  getAllAccidentsSortedByDateDesc,
  createAccident,
  getAccidentById,
  updateAccident,
  deleteAccident,
  getAccidentsByDate,
  getAccidentsByTime,
  accidentCountsByMonth,
  getAccidentsGroupedByWeather,
  getAccidentsMapData,
  getAccidentsLastThreeDays,
  getAccidentsStatisticsLastThreeDays,
  groupByDistrict,
  getTotalAccidentStatistics

};
