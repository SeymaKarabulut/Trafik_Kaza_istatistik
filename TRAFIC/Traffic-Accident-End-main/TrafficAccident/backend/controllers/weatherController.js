const  WeatherRepository= require('../repositories/weatherRepository.js');


const createWeather= async (req, res) => {
    const weather = await WeatherRepository.create(req.body);
    if (!weather) {
      return res.status(400).json({ error: 'Bad Request. Weather creation failed.' });
    }

    res.status(201).json(weather);
};

const getWeathers = async (req, res) => {
  const weathers = await WeatherRepository.getAll();
  res.status(200).json({
    count: weathers.length,
    data:weathers,
  });
};

const getWeatherById = async (req, res) => {
  const  id = req.params.id;
  const weather = await WeatherRepository.getById(id);
  if (!weather) {
    res.status(404);
    throw new Error('Weather not found');
  }
  res.status(200).json(weather);
};

const updateWeather = async (req, res) => {
  const  id = req.params.id; 
  const {weatherType } = req.body;
  const result = await WeatherRepository.update(id, {weatherType });
  if (!result) {
    res.status(404);
    throw new Error('Weather not found');
  }
  res.status(200).json({ message: 'Weather updated successfully', data: result });
};

const deleteWeather = async (req, res) => {
  const  id = req.params.id;
  const result = await WeatherRepository.delete(id);
  if (!result) {
    res.status(404);
    throw new Error('Vehicle not found');
  }

  res.status(200).json({ message: 'Vehicle deleted successfully', data: result });
};

module.exports = {
  createWeather,
  getWeathers,
  getWeatherById,
  updateWeather,
  deleteWeather,
};
