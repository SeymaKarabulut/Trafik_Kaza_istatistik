const Event = require("../models/eventModel"); 
const BaseRepository = require("./baseRepository");

class EventRepository extends BaseRepository {

}

module.exports = new EventRepository(Event);
