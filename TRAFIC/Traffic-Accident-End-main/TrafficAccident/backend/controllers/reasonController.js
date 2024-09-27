const ReasonRepostory = require("../repositories/reasonRepository.js");

const createReason = async (req, res) => {
  const reason = await ReasonRepostory.create(req.body);
  res.status(201).json(reason);
  if (!reason) {
    return res.status(400).json({ error: 'Bad Request. Reason creation failed.' });
  }

};

const getReasons =async (req, res) => {
  const reasons = await ReasonRepostory.getAll();
  return res.status(200).json({
    count: reasons.length,
    data: reasons,
  });
};

const getReasonById =async (req, res) => {
  const id  = req.params.id;
  const reason = await ReasonRepostory.getReasonById(id);
  if (!reason) {
    res.status(404);
    throw new Error('Reason not found');
  }

  res.status(200).json(reason);

};

const updateReason = async (req, res) => {
  const id  = req.params.id;
  const { reasonDetail } = req.body;
  const result = await ReasonRepostory.update(id, { reasonDetail });
  if (!result) {
    res.status(404);
    throw new Error('Reason not found');
  }

  res.status(200).json({ message: 'Reason updated successfully', data: result });
};

const deleteReason = async (req, res) => {
  const  id = req.params.id;
  const result = await ReasonRepostory.delete(id);

  if (!result) {
    res.status(404);
    throw new Error('Reason not found');
  }

  res.status(200).json({ message: 'Reason deleted successfully', data: result });
};

module.exports = {
  createReason,
  getReasons,
  getReasonById,
  updateReason,
  deleteReason,
};
