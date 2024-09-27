const AccidentType = require("../models/accidentTypeModel");
const BaseRepository = require("./baseRepository");

class AccidentTypeRepository extends BaseRepository {
  
}

module.exports = new AccidentTypeRepository(AccidentType);