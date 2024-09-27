const AccidentReason = require('../repositories/accidentReasonRepository.js');

const createAccidentReason = async (req, res) => {
 
    const accidentReason = await AccidentReason.create(req.body);
    if (!accidentReason) {
      return res.status(400).json({ error: 'Bad Request. AccidentReason creation failed.' });
    }
    res.status(201).json(accidentReason);

};

const getAccidentReasons = async (req, res) => {

    const accidentReasons = await AccidentReason.getAll({ path: 'accident reason' });
    res.status(200).json({
      count: accidentReasons.length,
      data: accidentReasons,
    });

};

const getAccidentReasonById = async (req, res) => {
 
    const id = req.params.id;
    const accidentReason = await AccidentReason.getById(id, { path: 'accident reason' });
    if (!accidentReason) {
      res.status(404);
      throw new Error('AccidentReason not found');
    }
    res.status(200).json(accidentReason);

};

const updateAccidentReason = async (req, res) => {

    const id = req.params.id;
    const { accident, reason } = req.body;
    const result = await AccidentReason.update(id, { accident, reason }, { path: 'accident reason' });
    if (!result) {
      res.status(404);
      throw new Error('AccidentReason not found');
    }
    res.status(200).json({ message: 'AccidentReason updated successfully', data: result });

};

const deleteAccidentReason = async (req, res) => {

    const id = req.params.id;
    const accidentReason = await AccidentReason.delete(id, { path: 'accident reason' });
    if (!accidentReason) {
      res.status(404);
      throw new Error('AccidentReason not found');
    }
    res.status(200).json({ message: 'AccidentReason deleted successfully', data: accidentReason });
 
};

const getAccidentCountsByReason = async (req, res) => {
 
    const accidentCountsByReason = await AccidentReason.getAccidentCountsByReason();
    res.json(accidentCountsByReason);

};

module.exports = {
  createAccidentReason,
  getAccidentReasons,
  getAccidentReasonById,
  updateAccidentReason,
  deleteAccidentReason,
  getAccidentCountsByReason,
};
