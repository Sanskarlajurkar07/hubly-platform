const Ticket = require('../models/Ticket');

const generateTicketId = async () => {
  try {
    const count = await Ticket.countDocuments();
    const ticketNumber = count + 1;
    return `TICKET-${String(ticketNumber).padStart(4, '0')}`;
  } catch (error) {
    throw new Error('Error generating ticket ID');
  }
};

module.exports = generateTicketId;