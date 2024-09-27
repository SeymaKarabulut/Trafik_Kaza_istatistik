const  DriverRepostory= require('../repositories/driverRepository.js');


const createDriver = async (req, res) => {
    const driver = await DriverRepostory.create(req.body);
    if (!driver) {
      return res.status(400).json({ error: 'Bad Request. Driver creation failed.' });
    }

    res.status(201).json(driver);
};

const getDrivers = async (req, res) => {
  const drivers = await DriverRepostory.getAll({ path: 'vehicle' });
  res.status(200).json({
    count: drivers.length,
    data: drivers,
  });
};

const getDriverById = async (req, res) => {
  const id  = req.params.id;
  const driver = await DriverRepostory.getById(id,{ path: 'vehicle' });
  if (!driver) {
    res.status(404);
    throw new Error('Driver not found');
  }
  res.status(200).json(district);
};

const updateDriver = async (req, res) => {
  const id = req.params.id;
  const { firstName,lastName,vehicle,gender,age,speed,alcoholLevel} = req.body;
  const result = await DriverRepostory.update(id, {firstName,lastName,vehicle,gender,age ,speed ,alcoholLevel},{ path: 'vehicle' });
  if (!result) {
    res.status(404);
    throw new Error('Driver not found');
  }
  res.status(200).json({ message: 'District updated successfully', data: result });
};

const deleteDriver = async (req, res) => {
  const id  = req.params.id;
  const result = await DriverRepostory.delete(id,{ path: 'vehicle' });
  if (!result) {
    res.status(404);
    throw new Error('Driver not found');
  }

  res.status(200).json({ message: 'Driver deleted successfully', data: result });
};

module.exports = {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};
