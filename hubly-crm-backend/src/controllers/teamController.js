const User = require('../models/User');
const Ticket = require('../models/Ticket');

// @desc    Get all team members
// @route   GET /api/team
// @access  Private (Admin/Team)
const getTeam = async (req, res) => {
  try {
    const team = await User.find({}).select('-password');
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add team member
// @route   POST /api/team
// @access  Private (Admin)
const addTeamMember = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'team_member',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update team member (Profile or Role)
// @route   PUT /api/team/:id
// @access  Private (Admin or Self)
const updateTeamMember = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // Check permissions
    // Admin can update anyone. Member can only update self.
    if (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.profileImage = req.body.profileImage || user.profileImage;

    // Only admin can change role
    if (req.user.role === 'admin' && req.body.role) {
      user.role = req.body.role;
    }

    // Email cannot be changed as per requirements
    // "Email cannot be changed once registered."

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      profileImage: updatedUser.profileImage,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private (Admin)
const deleteTeamMember = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Reassign tickets to Admin before deleting
      const admin = await User.findOne({ role: 'admin' });
      if (admin) {
        await Ticket.updateMany({ assignedTo: user._id }, { assignedTo: admin._id });
      }

      await User.deleteOne({ _id: user._id }); // Use deleteOne instead of remove
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTeam, addTeamMember, updateTeamMember, deleteTeamMember };