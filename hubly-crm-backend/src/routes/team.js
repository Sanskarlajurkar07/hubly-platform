const express = require('express');
const router = express.Router();
const { getTeam, addTeamMember, updateTeamMember, deleteTeamMember } = require('../controllers/teamController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTeam).post(protect, admin, addTeamMember);
router.route('/:id').put(protect, updateTeamMember).delete(protect, admin, deleteTeamMember);

module.exports = router;