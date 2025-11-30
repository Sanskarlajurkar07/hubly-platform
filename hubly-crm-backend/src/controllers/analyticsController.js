const Ticket = require('../models/Ticket');
const Message = require('../models/Message');
const MissedChat = require('../models/MissedChat');

// @desc    Get dashboard stats (counts)
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const resolvedTickets = await Ticket.countDocuments({ status: 'Resolved' });
    const unresolvedTickets = await Ticket.countDocuments({ status: { $ne: 'Resolved' } });

    res.json({
      totalTickets,
      resolvedTickets,
      unresolvedTickets,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get analytics data
// @route   GET /api/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    // 1. Resolved vs Unresolved Ratio
    const totalTickets = await Ticket.countDocuments();
    const resolvedTickets = await Ticket.countDocuments({ status: 'Resolved' });
    const unresolvedTickets = totalTickets - resolvedTickets;

    // 2. Total Chats Till Date
    const totalChats = await Ticket.countDocuments();

    // 3. Average Reply Time (Mock for now)
    const avgReplyTime = 15; // minutes (Mock for now as calculation is heavy)

    // 4. Missed Chats Historical Data
    const missedChatsData = await MissedChat.find().sort({ week: 1 }).select('week chats -_id');

    res.json({
      resolvedVsUnresolved: {
        resolved: resolvedTickets,
        unresolved: unresolvedTickets,
      },
      totalChats,
      avgReplyTime,
      missedChatsHistory: missedChatsData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats, getAnalytics };