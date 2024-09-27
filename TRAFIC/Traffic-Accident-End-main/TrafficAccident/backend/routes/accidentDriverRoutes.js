const express = require('express');
const validateToken = require('../middleware/authenticateUser');
const {
  createAccidentDriver,
  getAccidentDrivers,
  getAccidentDriverById,
  updateAccidentDriver,
  deleteAccidentDriver,
} = require('../controllers/accidentDriverController');

const accidentDriverRouter = express.Router();

// Async hata yakalama işlevi
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
accidentDriverRouter.route('/').get(asyncHandler(getAccidentDrivers)).post(asyncHandler(createAccidentDriver));

accidentDriverRouter
  .route('/:id')
  .get(asyncHandler(getAccidentDriverById))
  .put(asyncHandler(updateAccidentDriver))
  .delete(asyncHandler(deleteAccidentDriver));

module.exports = accidentDriverRouter;
