const express = require('express');
const router = express.Router();

const {
  getAccidents,
  getAllAccidentsSortedByDateAsc,
  getAllAccidentsSortedByDateDesc,
  createAccident,
  getAccidentById,
  updateAccident,
  deleteAccident,
  getAccidentsByDate,
  accidentCountsByMonth,
  getAccidentsByTime,
  getAccidentsGroupedByWeather,
  getAccidentsMapData,
  getAccidentsLastThreeDays,
  getAccidentsStatisticsLastThreeDays,
  groupByDistrict,
  getTotalAccidentStatistics,
} = require('../controllers/accidentController');

// Async hata yakalama işlevi
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes
router.get('/getAccidentsStatisticsLastThreeDays', asyncHandler(getAccidentsStatisticsLastThreeDays));
router.get('/getAccidentsGroupedByWeather', asyncHandler(getAccidentsGroupedByWeather));
router.get('/getAllAccidentsSortedByDateAsc', asyncHandler(getAllAccidentsSortedByDateAsc));
router.get('/getAllAccidentsSortedByDateDesc', asyncHandler(getAllAccidentsSortedByDateDesc));
router.get('/getAccidentsByTime/:hour/:minute', asyncHandler(getAccidentsByTime));
router.get('/getAccidentsMapData', asyncHandler(getAccidentsMapData)); 
router.get('/getAccidentsLastThreeDays', asyncHandler(getAccidentsLastThreeDays));  
router.get('/grouped-by-district', asyncHandler(groupByDistrict));
router.get('/totalAccidentStatistics', asyncHandler(getTotalAccidentStatistics));

router.route('/')
  .get(asyncHandler(getAccidents))
  .post(asyncHandler(createAccident));

router.get('/accidents-by-month', asyncHandler(accidentCountsByMonth));
router.route('/:id')
  .get(asyncHandler(getAccidentById))
  .put(asyncHandler(updateAccident))
  .delete(asyncHandler(deleteAccident));

module.exports = router;
