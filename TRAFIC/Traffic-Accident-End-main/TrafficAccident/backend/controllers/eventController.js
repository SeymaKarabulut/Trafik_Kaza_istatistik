const EventRepository = require('../repositories/eventRepository.js'); // EventRepository Repository'yi doğru şekilde import 

const createEvent = async (req, res) => {
  const event = await EventRepository.create(req.body);
  if (!event) {
    return res.status(400).json({ error: 'Bad Request. EventRepository creation failed.' });
  }

  res.status(201).json(event);
};

const getEvents = async (req, res) => {
  const events = await EventRepository.getAll();
  res.status(200).json({
    count: events.length,
    data: events,
  });
};

const getEventById = async (req, res) => {
  const id = req.params.id;
  const event = await EventRepository.getById(id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  res.status(200).json(event);
};

const updateEvent = async (req, res) => {
  const id = req.params.id;
  const eventData = req.body;
  const result = await EventRepository.update(id, eventData);
  if (!result) {
    res.status(404);
    throw new Error('Event not found');
  }
  res.status(200).json({ message: 'Event updated successfully', data: result });
};

const deleteEvent = async (req, res) => {
  const id = req.params.id;
  const result = await EventRepository.delete(id);
  if (!result) {
    res.status(404);
    throw new Error('Event not found');
  }

  res.status(200).json({ message: 'Event deleted successfully', data: result });
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
