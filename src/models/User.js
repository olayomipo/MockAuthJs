const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  address: {
    country: String,
    state: String,
    city: String,
    postalCode: String
  },
  profilePhoto: String,
  password: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
