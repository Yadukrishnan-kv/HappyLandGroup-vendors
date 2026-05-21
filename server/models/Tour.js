const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Tour title is required'],
      unique: true,
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    rating: {
      type: Number,
      default: 5.0,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5']
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    maxPeople: {
      type: Number,
      required: [true, 'Group size limit is required'],
      default: 10
    },
    distance: {
      type: Number,
      required: [true, 'Distance metric is required'],
      default: 500
    },
    tourType: {
      type: String,
      enum: ['UAE Tours', 'International Tour'],
      default: 'UAE Tours'
    },
    duration: {
      type: String,
      default: '1 Day'
    },
    includes: {
      type: [String],
      default: []
    },
    featured: {
      type: Boolean,
      default: false
    },
    startDates: {
      type: [Date],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Tour', tourSchema);
