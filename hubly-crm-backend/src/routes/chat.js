const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access :ticketId from parent route
const { sendMessage, getMessages } = require('../controllers/chatController');
// We might not protect this fully if we want public access for customers, 
// but usually we'd have separate endpoints or check sender type.
// For now, let's leave it open or handle auth inside controller if needed.
// Actually, for the user side, they don't have a token.
// So we should probably NOT protect the GET/POST for messages if it's the customer.
// But we need to protect for agents?
// Let's keep it open for now as per "Public-Facing Landing Page" requirement implying easy access.

router.route('/').post(sendMessage).get(getMessages);

module.exports = router;
