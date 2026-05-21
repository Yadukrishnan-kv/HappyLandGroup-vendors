const dbHelper = require('../utils/dbHelper');

// @desc    Get all active premium services
// @route   GET /api/premium-services
// @access  Public
const getPremiumServices = async (req, res) => {
  try {
    const services = await dbHelper.findPremiumServices({ status: 'active' });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all premium services (Admin)
// @route   GET /api/premium-services/all
// @access  Private/Admin
const getAllPremiumServices = async (req, res) => {
  try {
    const services = await dbHelper.findPremiumServices();
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single premium service details
// @route   GET /api/premium-services/:id
// @access  Public
const getPremiumServiceById = async (req, res) => {
  try {
    const service = await dbHelper.findPremiumServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Premium service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a premium service
// @route   POST /api/premium-services
// @access  Private/Admin
const createPremiumService = async (req, res) => {
  try {
    const { name, icon, shortDescription, title, about, order, status } = req.body;
    let image = '';
    
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image; // Allow seeded image URLs
    } else {
      return res.status(400).json({ success: false, message: 'Cover image is required' });
    }

    const service = await dbHelper.createPremiumService({
      name,
      icon,
      shortDescription,
      title,
      about,
      image,
      order: order ? Number(order) : 0,
      status: status || 'active'
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a premium service
// @route   PUT /api/premium-services/:id
// @access  Private/Admin
const updatePremiumService = async (req, res) => {
  try {
    const service = await dbHelper.findPremiumServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Premium service not found' });
    }

    const { name, icon, shortDescription, title, about, order, status } = req.body;
    let updateData = { name, icon, shortDescription, title, about, order: order ? Number(order) : 0, status };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      updateData.image = req.body.image;
    }

    const updatedService = await dbHelper.updatePremiumService(req.params.id, updateData);
    res.json({ success: true, data: updatedService });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a premium service
// @route   DELETE /api/premium-services/:id
// @access  Private/Admin
const deletePremiumService = async (req, res) => {
  try {
    const service = await dbHelper.findPremiumServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Premium service not found' });
    }
    await dbHelper.deletePremiumService(req.params.id);
    res.json({ success: true, message: 'Premium service removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPremiumServices,
  getAllPremiumServices,
  getPremiumServiceById,
  createPremiumService,
  updatePremiumService,
  deletePremiumService
};
