const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    ticketId: {
        type: String,
        required: true,
        ref: 'Ticket', // Reference by custom ticketId string if possible, or we query by it
    },
    sender: {
        type: String, // 'customer' or 'agent'
        required: true,
        enum: ['customer', 'agent'],
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Only if sender is agent
    },
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
