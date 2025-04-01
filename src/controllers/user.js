const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { id } = req.query; // Get id from query
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


//This should upload not find , find should be another function
// @desc    Upload profile photo
// @route   POST /api/users/photo
// @access  Private
const uploadProfilePhoto = async (req, res) => {
  try {
    const { id } = req.query; // Get id from query
    const filePath = `/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(id, { profilePhoto: filePath }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile photo updated', profilePhoto: filePath });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// @desc    Change user password
// @route   PUT /api/users/profile/password
// @access  Private
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const { id } = req.query; // Get id from query
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// @desc    Get user profile by email
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const { email } = req.query; // Get email from query

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email }).select('-password'); // Find by email

    if (!user) {
      return res.status(404).json({ message: `User with email ${email} not found` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {
  updateProfile,
  uploadProfilePhoto,
  changePassword,
  getProfile
};
