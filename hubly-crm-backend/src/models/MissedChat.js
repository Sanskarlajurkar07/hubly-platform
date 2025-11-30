const mongoose = require('mongoose');

const missedChatSchema = new mongoose.Schema({
    week: {
        type: String,
        required: true,
    },
    chats: {
        type: Number,
        required: true,
        default: 0,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
}, {
    timestamps: true,
});

const MissedChat = mongoose.model('MissedChat', missedChatSchema);

module.exports = MissedChat;
