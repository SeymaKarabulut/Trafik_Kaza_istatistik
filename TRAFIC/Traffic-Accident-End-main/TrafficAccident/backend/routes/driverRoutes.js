const express = require('express');
const router = express.Router();

const {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} = require('../controllers/driverController');

// Async hata yakalama işlevi
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes
router.route('/')
  .get(asyncHandler(getDrivers))
  .post(asyncHandler(createDriver));

router.route('/:id')
  .get(asyncHandler(getDriverById))
  .put(asyncHandler(updateDriver))
  .delete(asyncHandler(deleteDriver));

module.exports = router;
