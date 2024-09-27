const express = require('express');
const validateToken = require('../middleware/authenticateUser');
const {
    createWeather,
    getWeathers,
    getWeatherById,
    updateWeather,
    deleteWeather
} = require('../controllers/weatherController');

const weatherRoutes = express.Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);


weatherRoutes.route('/').get(asyncHandler(getWeathers)).post(asyncHandler(createWeather));

weatherRoutes.route('/:id').get(asyncHandler(getWeatherById)).put(asyncHandler(updateWeather)).delete(asyncHandler(deleteWeather));

module.exports = weatherRoutes;
