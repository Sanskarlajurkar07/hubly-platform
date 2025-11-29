const express = require('express');
const router = express.Router();
const { createTicket, getTickets, getTicketById, updateTicket } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

const chatRoutes = require('./chat');

router.use('/:ticketId/messages', chatRoutes);

router.route('/').post(createTicket).get(protect, getTickets);
router.route('/:id').get(protect, getTicketById).put(protect, updateTicket);

module.exports = router;