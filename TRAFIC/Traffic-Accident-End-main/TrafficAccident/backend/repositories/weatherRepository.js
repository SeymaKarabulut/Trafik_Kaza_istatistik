const Weather = require("../models/weatherModel");
const BaseRepository = require("./baseRepository");

class WeatherRepository extends BaseRepository {

}

module.exports = new WeatherRepository(Weather);