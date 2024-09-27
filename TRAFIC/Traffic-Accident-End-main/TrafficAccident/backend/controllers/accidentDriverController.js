const  AccidentDriver= require('../repositories/accidentDriverRepository.js');


const createAccidentDriver= async (req, res) => {
    const accidentDriver = await AccidentDriver.create(req.body);
    if (!accidentDriver) {
      return res.status(400).json({ error: 'Bad Request. accidentDriver creation failed.' });
    }

    res.status(201).json(accidentDriver);
};

const getAccidentDrivers = async (req, res) => {
  const accidentDrivers = await AccidentDriver.getAll({ path: 'accident driver' });
  res.status(200).json({
    count: accidentDrivers.length,
    data:accidentDrivers,
  });
};

const getAccidentDriverById = async (req, res) => {
  const  id = req.params.id;
  const accidentDriver = await AccidentDriver.getById(id,{ path: 'accident driver' });
  if (!accidentDriver) {
    res.status(404);
    throw new Error('AccidentDriver not found');
  }
  res.status(200).json(accidentDriver);
};

const updateAccidentDriver = async (req, res) => {
  const  id = req.params.id; 
  const {accident,driver } = req.body;
  const result = await AccidentDriver.update(id, {accident,driver },{ path: 'accident driver' }, { new: true });
  if (!result) {
    res.status(404);
    throw new Error('AccidentDriver not found');
  }
  res.status(200).json({ message: 'AccidentDriver updated successfully', data: result });
};

const deleteAccidentDriver = async (req, res) => {
  const  id = req.params.id;
  const result = await AccidentDriver.delete(id,{ path: 'accident driver' });
  if (!result) {
    res.status(404);
    throw new Error('AccidentDriver not found');
  }

  res.status(200).json({ message: 'AccidentDriver deleted successfully', data: result });
};

module.exports = {
  createAccidentDriver,
  getAccidentDrivers,
  getAccidentDriverById,
  updateAccidentDriver,
  deleteAccidentDriver,
};
