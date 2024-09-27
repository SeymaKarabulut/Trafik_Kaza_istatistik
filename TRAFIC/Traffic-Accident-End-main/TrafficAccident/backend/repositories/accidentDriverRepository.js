const AccidentDriver = require("../models/accidentDriverModel");
const BaseRepository = require("./baseRepository");

class AccidentDriverRepository extends BaseRepository {

}

module.exports = new AccidentDriverRepository(AccidentDriver);
