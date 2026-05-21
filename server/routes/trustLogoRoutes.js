const express = require('express');
const router = express.Router();
const { 
  getTrustLogos, 
  getAllTrustLogos, 
  createTrustLogo, 
  updateTrustLogo, 
  deleteTrustLogo 
} = require('../controllers/trustLogoController');
const { protect, admin } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');

// Public route to get active logos
router.get('/', getTrustLogos);

// Admin routes
router.get('/all', protect, admin, getAllTrustLogos);
router.post('/', protect, admin, uploadSingle('logo'), createTrustLogo);
router.route('/:id')
  .put(protect, admin, uploadSingle('logo'), updateTrustLogo)
  .delete(protect, admin, deleteTrustLogo);

module.exports = router;
