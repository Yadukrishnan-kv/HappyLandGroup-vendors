const TrustLogo = require('../models/TrustLogo');

const getTrustLogos = async (req, res) => {
  try {
    const logos = await TrustLogo.find({ status: 'active' }).sort({ order: 1 });
    res.json({ success: true, data: logos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllTrustLogos = async (req, res) => {
  try {
    const logos = await TrustLogo.find().sort({ order: 1 });
    res.json({ success: true, data: logos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTrustLogo = async (req, res) => {
  try {
    const { name, website, order, status } = req.body;
    let logo = '';
    
    if (req.file) {
      logo = `/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ success: false, message: 'Logo image is required' });
    }

    const trustLogo = await TrustLogo.create({
      name,
      website,
      logo,
      order: order || 0,
      status: status || 'active'
    });

    res.status(201).json({ success: true, data: trustLogo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateTrustLogo = async (req, res) => {
  try {
    const trustLogo = await TrustLogo.findById(req.params.id);
    if (!trustLogo) {
      return res.status(404).json({ success: false, message: 'Trust logo not found' });
    }

    const { name, website, order, status } = req.body;
    let updateData = { name, website, order, status };

    if (req.file) {
      updateData.logo = `/uploads/${req.file.filename}`;
    }

    const updatedLogo = await TrustLogo.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json({ success: true, data: updatedLogo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteTrustLogo = async (req, res) => {
  try {
    const trustLogo = await TrustLogo.findById(req.params.id);
    if (!trustLogo) {
      return res.status(404).json({ success: false, message: 'Trust logo not found' });
    }
    await trustLogo.deleteOne();
    res.json({ success: true, message: 'Trust logo removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTrustLogos,
  getAllTrustLogos,
  createTrustLogo,
  updateTrustLogo,
  deleteTrustLogo
};
