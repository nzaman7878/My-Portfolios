const PortfolioSettings = require('../models/PortfolioSettings');

// @desc    Get portfolio settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    let settings = await PortfolioSettings.findOne({ singletonId: 'singleton' });
    
    if (!settings) {
      // If it doesn't exist, create it with defaults
      settings = await PortfolioSettings.create({});
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update portfolio settings
// @route   PUT /api/settings
// @access  Private (Admin)
const updateSettings = async (req, res) => {
  try {
    const { hero, about, philosophy, socials } = req.body;

    let settings = await PortfolioSettings.findOne({ singletonId: 'singleton' });
    
    if (!settings) {
      settings = await PortfolioSettings.create({});
    }

    if (hero) settings.hero = hero;
    if (about) settings.about = about;
    if (philosophy) settings.philosophy = philosophy;
    if (socials) settings.socials = socials;

    const updatedSettings = await settings.save();
    res.status(200).json(updatedSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
