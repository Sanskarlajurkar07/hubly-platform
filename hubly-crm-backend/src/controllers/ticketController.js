const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid'); // We might need to install uuid or just use random string

// Helper to generate short ticket ID
const generateTicketId = () => {
  return 'TKT-' + Math.floor(100000 + Math.random() * 900000);
}

// @desc    Create a new ticket (Public)
// @route   POST /api/tickets
// @access  Public
const createTicket = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    // Find default admin to assign if needed, or leave unassigned
    // Requirement: "By default, all new chats/tickets are assigned to Admin."
    const admin = await User.findOne({ role: 'admin' });

    const ticket = await Ticket.create({
      ticketId: generateTicketId(),
      customer: { name, email, phone },
      assignedTo: admin ? admin._id : null,
      status: 'Open'
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private (Admin/Team)
const getTickets = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
      ticketId: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {};

  // Filter by status if provided
  const statusFilter = req.query.status ? { status: req.query.status } : {};

  try {
    const count = await Ticket.countDocuments({ ...keyword, ...statusFilter });
    const tickets = await Ticket.find({ ...keyword, ...statusFilter })
      .populate('assignedTo', 'name email profileImage')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ updatedAt: -1 }); // Sort by latest activity

    res.json({ tickets, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('assignedTo', 'name email');
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Update ticket (Status, Assignment)
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = async (req, res) => {
  const { status, assignedTo } = req.body;

  try {
    const ticket = await Ticket.findById(req.params.id);

    if (ticket) {
      if (status) ticket.status = status;
      if (assignedTo) ticket.assignedTo = assignedTo;

      const updatedTicket = await ticket.save();
      res.json(updatedTicket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTicket, getTickets, getTicketById, updateTicket };