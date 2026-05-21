const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add your email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email address',
    ],
    trim: true,
  },
  subject: {
    type: String,
    default: 'General Inquiry',
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Please add your message'],
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
