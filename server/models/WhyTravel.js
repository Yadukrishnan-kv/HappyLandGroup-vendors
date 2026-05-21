const mongoose = require('mongoose');

const whyTravelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a feature title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  icon: {
    type: String,
    default: null,
  },
  order: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('WhyTravel', whyTravelSchema);
