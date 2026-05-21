const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Contact Our Elite Concierge',
    trim: true,
  },
  description: {
    type: String,
    default: 'Reach out to our premium support team to tailor your dream luxury vacation or corporate excursion.',
  },
  phone: {
    type: String,
    default: '+971 4 123 4567',
    trim: true,
  },
  location: {
    type: String,
    default: 'Happy Land Premium Building, Office 302, Ajman, UAE',
    trim: true,
  },
  facebook: {
    type: String,
    default: 'https://facebook.com',
    trim: true,
  },
  instagram: {
    type: String,
    default: 'https://instagram.com',
    trim: true,
  },
  twitter: {
    type: String,
    default: 'https://twitter.com',
    trim: true,
  },
  linkedin: {
    type: String,
    default: 'https://linkedin.com',
    trim: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
