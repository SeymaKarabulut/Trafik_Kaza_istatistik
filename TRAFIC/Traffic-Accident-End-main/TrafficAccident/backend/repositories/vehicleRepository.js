const Vehicle = require("../models/vehicleModel");
const BaseRepository = require("./baseRepository");

class VehicleRepository extends BaseRepository {
  
}

module.exports = new VehicleRepository(Vehicle);
