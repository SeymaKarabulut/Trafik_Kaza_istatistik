const  AccidentTypeRepository= require('../repositories/accidentTypeRepository.js');


const createAccidentType = async (req, res) => {
    const accidentType = await AccidentTypeRepository.create(req.body);
    if (!accidentType) {
      return res.status(400).json({ error: 'Bad Request. AccidentType creation failed.' });
    }

    res.status(201).json(accidentType);
};

const getAccidentTypes = async (req, res) => {
  const accidentTypes = await AccidentTypeRepository.getAll();
  res.status(200).json({
    count: accidentTypes.length,
    data: accidentTypes,
  });
};

const getAccidentTypeById = async (req, res) => {
  const id  = req.params.id;
  const accidentType = await AccidentTypeRepository.getById(id);
  if (!accidentType) {
    res.status(404);
    throw new Error('AccidentTypes not found');
  }
  res.status(200).json(district);
};

const updateAccidentType = async (req, res) => {
  const id = req.params.id;
  const {accidentType } = req.body;
  const result = await AccidentTypeRepository.update(id, {accidentType});
  if (!result) {
    res.status(404);
    throw new Error('AccidentType not found');
  }
  res.status(200).json({ message: 'AccidentType updated successfully', data: result });
};

const deleteAccidentType = async (req, res) => {
  const id  = req.params.id;
  const result = await AccidentTypeRepository.delete(id);
  if (!result) {
    res.status(404);
    throw new Error('AccidentType not found');
  }

  res.status(200).json({ message: 'AccidentType deleted successfully', data: result });
};

module.exports = {
  createAccidentType,
  getAccidentTypes,
  getAccidentTypeById,
  updateAccidentType,
  deleteAccidentType,
};
