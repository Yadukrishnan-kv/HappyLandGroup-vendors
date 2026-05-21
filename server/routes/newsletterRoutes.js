const express = require('express');
const router = express.Router();
const dbHelper = require('../utils/dbHelper');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
router.post('/subscribe', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400);
      throw new Error('Please enter a valid email address');
    }

    const subscriber = await dbHelper.createSubscriber(email);

    res.status(201).json({
      success: true,
      message: 'Thank you! You have successfully subscribed to Benets Tours newsletter.',
      data: subscriber
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
