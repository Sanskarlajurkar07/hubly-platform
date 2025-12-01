const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  chatBotConfig: {
    headerColor: { type: String, default: '#3B82F6' },
    backgroundColor: { type: String, default: '#FFFFFF' },
    initialMessage: { type: String, default: 'How can i help you?' },
    secondaryMessage: { type: String, default: 'Ask me anything!' },
    welcomeMessage: { type: String, default: "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way." },
    introForm: {
      nameLabel: { type: String, default: 'Your name' },
      phoneLabel: { type: String, default: 'Your Phone' },
      emailLabel: { type: String, default: 'Your Email' },
    },
  },
  missedChatTimer: {
    type: Number,
    default: 10, // minutes
  },
}, {
  timestamps: true,
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;