const mongoose = require("mongoose");
const dateFormat = require("date-format");

const accidentSchema = new mongoose.Schema({
  accidentType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccidentType',
    required: true,
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: true,
  },
  date: {
    type: String,
    required: true,
    get: function () {
      const date = new Date(this);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ay endeksleri 0'dan başlar, bu yüzden +1 ekliyoruz.
      const year = date.getFullYear().toString();

      return `${day}-${month}-${year}`;
    },
  },
  time: {
    type: String,
    required: true,
  },

  weather: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Weather',
    required: true,
  },
  deathCount: {
    type: Number,
    required: true,
   },
  injuryCount: {
    type: Number,
    required: true,
  }

});



const Accident = mongoose.model('Accident', accidentSchema);

module.exports = Accident;
