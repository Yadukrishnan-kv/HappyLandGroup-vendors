const express = require('express');
const router = express.Router();
const {
  getContactDetails,
  updateContactDetails,
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public endpoints
router.get('/', getContactDetails);
router.post('/messages', submitContactMessage);

// Protected admin endpoints
router.put('/', protect, admin, updateContactDetails);
router.get('/messages', protect, admin, getContactMessages);
router.put('/messages/:id/status', protect, admin, updateMessageStatus);
router.delete('/messages/:id', protect, admin, deleteMessage);

module.exports = router;
