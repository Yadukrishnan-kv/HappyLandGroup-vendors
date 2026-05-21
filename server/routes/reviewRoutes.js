const express = require('express');
const router = express.Router();
const { createReview, getTourReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createReview);
router.get('/tour/:tourId', getTourReviews);

module.exports = router;
