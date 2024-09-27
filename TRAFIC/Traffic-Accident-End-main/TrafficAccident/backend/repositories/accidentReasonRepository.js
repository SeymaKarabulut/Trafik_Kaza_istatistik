const BaseRepository = require("./baseRepository");
const AccidentReason = require("../models/accidentReasonModel");

class AccidentReasonRepository extends BaseRepository {
  async getAccidentCountsByReason() {
    try {
      const result = await this.model.aggregate([
        {
          $lookup: {
            from: "reasons",
            localField: "reason",
            foreignField: "_id",
            as: "reasonDetails",
          },
        },
        {
          $group: {
            _id: "$reasonDetails.reasonDetail",
            count: { $sum: 1 },
            accidents: { $push: "$$ROOT" }, // Her bir kazayı accidents listesine ekleyin
          },
        },
        {
          $project: {
            _id: 0,
            reasonDetail: "$_id",
            count: 1,
            accidents: 1,
          },
        },
      ]);

      console.log(result);
      return result;
    } catch (error) {
      console.error("Error getting accident counts by reason:", error);
      throw error;
    }
  }
}

module.exports = new AccidentReasonRepository(AccidentReason);
