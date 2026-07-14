const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true // e.g., "Postgraduate", "2020 - 2022"
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
