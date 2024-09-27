const express = require('express');
const validateToken = require('../middleware/authenticateUser');
const {
  createAccidentReason,
  getAccidentReasons,
  getAccidentReasonById,
  updateAccidentReason,
  deleteAccidentReason,
  getAccidentCountsByReason
} = require('../controllers/accidentReasonController');

const accidentReasonRouter = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


accidentReasonRouter.route('/counts-by-reason').get(asyncHandler(getAccidentCountsByReason));

accidentReasonRouter
  .route('/:id')
  .get(asyncHandler(getAccidentReasonById))
  .put(asyncHandler(updateAccidentReason))
  .delete(asyncHandler(deleteAccidentReason));


accidentReasonRouter
  .route('/')
  .get(asyncHandler(getAccidentReasons))
  .post(asyncHandler(createAccidentReason));

module.exports = accidentReasonRouter;
