const Message = require('../models/Message');
const Ticket = require('../models/Ticket');

// @desc    Send a message
// @route   POST /api/tickets/:ticketId/messages
// @access  Public (for customer) / Private (for agent)
const sendMessage = async (req, res) => {
    const { text, sender, senderId } = req.body;
    const { ticketId } = req.params;

    try {
        // Check if ticket exists (by _id or ticketId string? Route param usually implies _id, but let's support both or stick to _id)
        // The ticketController uses _id in routes. Let's assume :ticketId is the _id of the ticket document.

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const message = await Message.create({
            ticketId: ticketId, // Storing the _id reference
            sender,
            senderId: senderId || null,
            text,
        });

        // Update ticket's lastMessageAt
        ticket.lastMessageAt = Date.now();
        // If customer replies, maybe change status to 'Open' or 'In Progress'? 
        // Requirement doesn't specify, but good practice.
        if (sender === 'customer' && ticket.status === 'Resolved') {
            ticket.status = 'Open';
        }
        await ticket.save();

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get messages for a ticket
// @route   GET /api/tickets/:ticketId/messages
// @access  Public (with some token?) or Private. 
// For customer chat box, they might need to poll. 
// Since we don't have customer auth, we might rely on the ticketId being known to them (in local storage).
const getMessages = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const messages = await Message.find({ ticketId }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendMessage, getMessages };
