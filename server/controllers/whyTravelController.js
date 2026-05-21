const WhyTravel = require('../models/WhyTravel');

const getWhyTravelFeatures = async (req, res) => {
  try {
    const features = await WhyTravel.find({ status: 'active' }).sort({ order: 1 });
    res.json({ success: true, data: features });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllWhyTravelFeatures = async (req, res) => {
  try {
    const features = await WhyTravel.find().sort({ order: 1 });
    res.json({ success: true, data: features });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createWhyTravelFeature = async (req, res) => {
  try {
    const { title, description, order, status } = req.body;
    let icon = null;
    
    if (req.file) {
      icon = `/uploads/${req.file.filename}`;
    }

    const feature = await WhyTravel.create({
      title,
      description,
      icon,
      order: order || 0,
      status: status || 'active'
    });

    res.status(201).json({ success: true, data: feature });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateWhyTravelFeature = async (req, res) => {
  try {
    const feature = await WhyTravel.findById(req.params.id);
    if (!feature) {
      return res.status(404).json({ success: false, message: 'Feature not found' });
    }

    const { title, description, order, status } = req.body;
    let updateData = { title, description, order, status };

    if (req.file) {
      updateData.icon = `/uploads/${req.file.filename}`;
    }

    const updatedFeature = await WhyTravel.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json({ success: true, data: updatedFeature });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteWhyTravelFeature = async (req, res) => {
  try {
    const feature = await WhyTravel.findById(req.params.id);
    if (!feature) {
      return res.status(404).json({ success: false, message: 'Feature not found' });
    }
    await feature.deleteOne();
    res.json({ success: true, message: 'Feature removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getWhyTravelFeatures,
  getAllWhyTravelFeatures,
  createWhyTravelFeature,
  updateWhyTravelFeature,
  deleteWhyTravelFeature
};
