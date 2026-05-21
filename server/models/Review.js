const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Tour reference is required']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1 star'],
      max: [5, 'Rating cannot exceed 5 stars']
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// We can add a static method to calculate average rating of the tour when a review is added
reviewSchema.statics.calculateAverageRating = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Tour').findByIdAndUpdate(tourId, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      reviewsCount: stats[0].nRatings
    });
  } else {
    await mongoose.model('Tour').findByIdAndUpdate(tourId, {
      rating: 5.0,
      reviewsCount: 0
    });
  }
};

// Call calculateAverageRating after save
reviewSchema.post('save', function() {
  this.constructor.calculateAverageRating(this.tour);
});

// Call calculateAverageRating before delete (if ever deleted)
reviewSchema.post('remove', function() {
  this.constructor.calculateAverageRating(this.tour);
});

module.exports = mongoose.model('Review', reviewSchema);
