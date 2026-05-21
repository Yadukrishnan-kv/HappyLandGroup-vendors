const express = require('express');
const router = express.Router();
const { getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getTours)
  .post(protect, admin, createTour);

router.route('/:id')
  .get(getTourById)
  .put(protect, admin, updateTour)
  .delete(protect, admin, deleteTour);

module.exports = router;
