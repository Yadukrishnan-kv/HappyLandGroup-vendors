const express = require('express');
const router = express.Router();
const { 
  getPremiumServices, 
  getAllPremiumServices, 
  getPremiumServiceById,
  createPremiumService, 
  updatePremiumService, 
  deletePremiumService 
} = require('../controllers/premiumServiceController');
const { protect, admin } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');

// Admin routes
router.get('/all', protect, admin, getAllPremiumServices);
router.post('/', protect, admin, uploadSingle('image'), createPremiumService);

// Public routes
router.get('/', getPremiumServices);
router.get('/:id', getPremiumServiceById);

router.route('/:id')
  .put(protect, admin, uploadSingle('image'), updatePremiumService)
  .delete(protect, admin, deletePremiumService);

module.exports = router;
