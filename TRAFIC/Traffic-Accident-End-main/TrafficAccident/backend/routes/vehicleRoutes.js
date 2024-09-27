const express = require('express');
const validateToken = require('../middleware/authenticateUser');
const {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
} = require('../controllers/vehicleController');

const vehicleRouter = express.Router();


const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

vehicleRouter.route('/').get(asyncHandler(getVehicles)).post(asyncHandler(createVehicle));

vehicleRouter.route('/:id').get(asyncHandler(getVehicleById)).put(asyncHandler(updateVehicle)).delete(asyncHandler(deleteVehicle));

module.exports = vehicleRouter;
