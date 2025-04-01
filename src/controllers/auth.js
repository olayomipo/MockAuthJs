const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// const user_data = {
//   "firstName": "John",
//   "lastName": "Doe",
//   "email": "john@example.com",
//   "phone": "123-456-7890",
//   "address": {
//     "country": "USA",
//     "state": "California",
//     "city": "Los Angeles",
//     "postalCode": "90001"
//   },
//   "profilePhoto": "https://example.com/profile.jpg",
//   "password": "SecurePassword123"
// }

const user_data = {
  "lastName": "",
  "phone": "123-456-7890",
  "address": {
    "country": "",
    "state": "",
    "city": "",
    "postalCode": ""
  },
  "profilePhoto": "https://example.com/profile.jpg",
}


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ firstName, email, password: hashedPassword , ...user_data});
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user and get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
