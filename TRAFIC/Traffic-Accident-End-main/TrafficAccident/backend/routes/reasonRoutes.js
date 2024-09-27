const express = require('express');
const validateToken = require('../middleware/authenticateUser');
const {
  createReason,
  getReasons,
  getReasonById,
  updateReason,
  deleteReason,
} = require('../controllers/reasonController');

const reasonRouter = express.Router();

// Async hata yakalama işlevi
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes
reasonRouter.route('/')
  .get(asyncHandler(getReasons))
  .post(asyncHandler(createReason));

reasonRouter.route('/:id')
  .get(asyncHandler(getReasonById))
  .put(asyncHandler(updateReason))
  .delete(asyncHandler(deleteReason));

module.exports = reasonRouter;
