const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const dbHelper = require('../utils/dbHelper');
const { uploadSingle } = require('../middleware/uploadMiddleware');

// @desc    Get system settings (including logo)
// @route   GET /api/settings
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const settings = await dbHelper.getSettings();
    res.json({
      success: true,
      data: settings
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Update system settings (including logo)
// @route   PUT /api/settings
// @access  Private/Admin
router.put('/', protect, admin, uploadSingle('logo'), async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.logoUrl = `/uploads/${req.file.filename}`;
    }
    const settings = await dbHelper.updateSettings(updateData);
    res.json({
      success: true,
      message: 'System settings successfully updated.',
      data: settings
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
