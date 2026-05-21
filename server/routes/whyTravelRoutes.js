const express = require('express');
const router = express.Router();
const { 
  getWhyTravelFeatures, 
  getAllWhyTravelFeatures, 
  createWhyTravelFeature, 
  updateWhyTravelFeature, 
  deleteWhyTravelFeature 
} = require('../controllers/whyTravelController');
const { protect, admin } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');

// Public route to get active features
router.get('/', getWhyTravelFeatures);

// Admin routes
router.get('/all', protect, admin, getAllWhyTravelFeatures);
router.post('/', protect, admin, uploadSingle('icon'), createWhyTravelFeature);
router.route('/:id')
  .put(protect, admin, uploadSingle('icon'), updateWhyTravelFeature)
  .delete(protect, admin, deleteWhyTravelFeature);

module.exports = router;
