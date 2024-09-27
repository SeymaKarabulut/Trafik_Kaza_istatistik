const express = require('express');
const router = express.Router();

const {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
} = require('../controllers/districtController');

// Async hata yakalama işlevi
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes
router.route('/')
  .get(asyncHandler(getDistricts))
  .post(asyncHandler(createDistrict));

router.route('/:id')
  .get(asyncHandler(getDistrictById))
  .put(asyncHandler(updateDistrict))
  .delete(asyncHandler(deleteDistrict));

module.exports = router;
