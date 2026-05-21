const mongoose = require('mongoose');

const premiumServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a premium service name'],
    trim: true,
  },
  icon: {
    type: String,
    required: [true, 'Please add an icon name'],
  },
  shortDescription: {
    type: String,
    required: [true, 'Please add a short description'],
  },
  title: {
    type: String,
    required: [true, 'Please add a detailed title'],
  },
  about: {
    type: String,
    required: [true, 'Please add detailed information (about)'],
  },
  image: {
    type: String,
    required: [true, 'Please add an image path or URL'],
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

module.exports = mongoose.model('PremiumService', premiumServiceSchema);
