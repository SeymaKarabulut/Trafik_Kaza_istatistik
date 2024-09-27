const mongoose = require("mongoose");

const accidentReasonSchema = new mongoose.Schema({
  accident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accident', // Eğer Accident modelini referans alıyorsa
    required: true,
  },
  reason: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reason', // Eğer Reason modelini referans alıyorsa
    required: true,
  },
});

const AccidentReason = mongoose.model('AccidentReason', accidentReasonSchema);

module.exports = AccidentReason;
