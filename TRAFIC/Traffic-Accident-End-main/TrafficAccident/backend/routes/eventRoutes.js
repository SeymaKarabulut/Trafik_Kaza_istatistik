const express = require('express');
const eventRoutes = express.Router();

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

// Async hata yakalama işlevi
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes
eventRoutes.route('/')
  .get(asyncHandler(getEvents))
  .post(asyncHandler(createEvent));

eventRoutes.route('/:id')
  .get(asyncHandler(getEventById))
  .put(asyncHandler(updateEvent))
  .delete(asyncHandler(deleteEvent));

module.exports = eventRoutes;
