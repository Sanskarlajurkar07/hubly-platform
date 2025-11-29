const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  chatBotConfig: {
    headerColor: { type: String, default: '#3B82F6' },
    backgroundColor: { type: String, default: '#FFFFFF' },
    initialMessage: { type: String, default: 'Hello! How can we help you?' },
    popMessageText: { type: String, default: 'Chat with us!' },
  },
  missedChatTimer: {
    type: Number,
    default: 5, // minutes
  },
}, {
  timestamps: true,
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;