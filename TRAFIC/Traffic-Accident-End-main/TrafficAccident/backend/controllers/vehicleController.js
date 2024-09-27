const  VehicleRepository= require('../repositories/vehicleRepository.js');


const createVehicle = async (req, res) => {

    const vehicle = await VehicleRepository.create(req.body);
    if (!vehicle) {
      return res.status(400).json({ error: 'Bad Request. Vehicle creation failed.' });
    }

    res.status(201).json(vehicle);
};

const getVehicles = async (req, res) => {
  const vehicles = await VehicleRepository.getAll();
  res.status(200).json({
    count: vehicles.length,
    data:vehicles,
  });
};

const getVehicleById = async (req, res) => {
  const  id = req.params.id;
  const vehicle = await VehicleRepository.getById(id);
  if (!vehicle) {
    res.status(404);
    throw new Error('Vehicle not found');
  }
  res.status(200).json(vehicle);
};

const updateVehicle = async (req, res) => {
  const  id = req.params.id;
  const {vehicleType,vehicleAge,vehicleInspection,speed } = req.body;
  const result = await VehicleRepository.update(id, {vehicleType,vehicleAge,vehicleInspection,speed});
  if (!result) {
    res.status(404).send('Vehicle not found');
  }
  res.status(200).json({ message: 'Vehicle updated successfully', data: result });
};

const deleteVehicle = async (req, res) => {
  const  id = req.params.id;
  const result = await VehicleRepository.delete(id);
  if (!result) {
    res.status(404);
    throw new Error('Vehicle not found');
  }

  res.status(200).json({ message: 'Vehicle deleted successfully', data: result });
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
