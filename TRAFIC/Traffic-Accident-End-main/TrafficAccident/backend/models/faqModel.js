const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    default: "", // İlk başta cevap yok
  },
  status: {
    type: String,
    enum: [ "cevaplandı", "cevaplanmadı"],
    default: "cevaplanmadı", // Varsayılan olarak cevap bekliyor
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // Admin modelini ekleyin
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
