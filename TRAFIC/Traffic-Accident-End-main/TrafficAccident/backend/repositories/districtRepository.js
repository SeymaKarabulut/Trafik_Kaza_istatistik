const District = require("../models/districtModel");
const BaseRepository = require("./baseRepository");

class DistrictRepository extends BaseRepository {
  // Özel semt işlemleri burada tanımlanabilir
}

module.exports = new DistrictRepository(District);
