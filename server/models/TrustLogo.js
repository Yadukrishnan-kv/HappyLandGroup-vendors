const mongoose = require('mongoose');

const trustLogoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a partner name'],
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    required: [true, 'Please add a logo image path'],
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

module.exports = mongoose.model('TrustLogo', trustLogoSchema);
