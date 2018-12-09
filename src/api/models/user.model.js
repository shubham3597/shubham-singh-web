const mongoose = require('mongoose');

// const { User, Workspace } = require('./');

const { Schema } = mongoose;

const UserSchema = new Schema({
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: 'default_user.png'
  },
  role: {
    type: String,
    required: true,
    default: 'member',
    enum: ['root', 'seller', 'member']
  },
  phoneNumber: {
    type: String,
    default: null
  },
  mobileNumber: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  created_date: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
