const Settings = require('../models/Settings');

// @desc    Get settings
// @route   GET /api/settings
// @access  Public (some parts) / Private
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private (Admin)
const updateSettings = async (req, res) => {
  const { chatBotConfig, missedChatTimer } = req.body;

  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    if (chatBotConfig) settings.chatBotConfig = chatBotConfig;
    if (missedChatTimer) settings.missedChatTimer = missedChatTimer;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSettings, updateSettings };