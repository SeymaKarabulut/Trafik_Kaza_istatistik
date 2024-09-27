const express = require('express');
const router = express.Router();

const {
  createAccidentType,
  getAccidentTypes,
  getAccidentTypeById,
  updateAccidentType,
  deleteAccidentType,
} = require('../controllers/accidentTypeController');

// Async hata yakalama işlevi
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes
router.route('/')
  .get(asyncHandler(getAccidentTypes))
  .post(asyncHandler(createAccidentType));

router.route('/:id')
  .get(asyncHandler(getAccidentTypeById))
  .put(asyncHandler(updateAccidentType))
  .delete(asyncHandler(deleteAccidentType));

module.exports = router;
