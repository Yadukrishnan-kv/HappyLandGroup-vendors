const dbHelper = require('../utils/dbHelper');

// @desc    Get dynamic contact page details
// @route   GET /api/contact
// @access  Public
const getContactDetails = async (req, res, next) => {
  try {
    const contactInfo = await dbHelper.getContactInfo();
    res.json({
      success: true,
      data: contactInfo
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update dynamic contact page details
// @route   PUT /api/contact
// @access  Private/Admin
const updateContactDetails = async (req, res, next) => {
  try {
    const updatedInfo = await dbHelper.updateContactInfo(req.body);
    res.json({
      success: true,
      message: 'Contact details successfully updated.',
      data: updatedInfo
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Submit a customer inquiry message
// @route   POST /api/contact/messages
// @access  Public
const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message.'
      });
    }

    const newMessage = await dbHelper.createContactMessage({
      name,
      email,
      subject: subject || 'General Inquiry',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry successfully submitted. Our elite concierge team will reach out shortly.',
      data: newMessage
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all customer messages
// @route   GET /api/contact/messages
// @access  Private/Admin
const getContactMessages = async (req, res, next) => {
  try {
    const messages = await dbHelper.findContactMessages();
    res.json({
      success: true,
      data: messages
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a message status
// @route   PUT /api/contact/messages/:id/status
// @access  Private/Admin
const updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message status.'
      });
    }

    const updatedMessage = await dbHelper.updateContactMessageStatus(req.params.id, status);
    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    res.json({
      success: true,
      message: `Message marked as ${status}.`,
      data: updatedMessage
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a message
// @route   DELETE /api/contact/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res, next) => {
  try {
    const result = await dbHelper.deleteContactMessage(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    res.json({
      success: true,
      message: 'Customer message successfully purged.'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getContactDetails,
  updateContactDetails,
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteMessage
};
