const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  architecture: {
    type: String,
    required: true,
  },
  keyFeatures: [{
    type: String
  }],
  techStack: [{
    type: String
  }],
  github: {
    type: String,
    default: '#'
  },
  demo: {
    type: String,
    default: '#'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
