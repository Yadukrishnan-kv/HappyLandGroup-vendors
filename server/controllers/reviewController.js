const dbHelper = require('../utils/dbHelper');

// @desc    Create a new review for a tour
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res, next) => {
  try {
    const { tourId, rating, comment } = req.body;

    if (!tourId || !rating || !comment) {
      res.status(400);
      throw new Error('Please provide tourId, star rating, and review comments');
    }

    const tour = await dbHelper.findTourById(tourId);
    if (!tour) {
      res.status(404);
      throw new Error('Tour package not found');
    }

    // Check if user already reviewed this tour
    const alreadyReviewed = await dbHelper.checkIfReviewed(req.user._id, tourId);

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have already submitted a review for this tour package');
    }

    const review = await dbHelper.createReview({
      user: req.user._id,
      tour: tourId,
      rating: Number(rating),
      comment
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! Review published.',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews for a tour
// @route   GET /api/reviews/tour/:tourId
// @access  Public
const getTourReviews = async (req, res, next) => {
  try {
    const reviews = await dbHelper.findReviewsByTour(req.params.tourId);

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getTourReviews
};
