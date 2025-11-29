const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // null means assigned to Admin by default logic or unassigned
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;