const Ticket = require('../models/Ticket');

// Get dashboard statistics
exports.getStats = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const resolvedTickets = await Ticket.countDocuments({ status: 'resolved' });
    const unresolvedTickets = await Ticket.countDocuments({
      status: { $in: ['open', 'in_progress'] }
    });

    res.json({
      totalTickets,
      resolvedTickets,
      unresolvedTickets
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search ticket by ID
exports.searchTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId })
      .populate('assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};