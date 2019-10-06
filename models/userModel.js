const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `please provide your name`]
  },
  email: {
    type: String,
    required: [true, `Please provide your email`],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, `Please provide a valid email`]
  },
  photo: { type: String, default: 'default.jpg' },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  password: {
    type: String,
    required: [true, `Please provide a password`],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, `Please confirm your password `],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: `Password are not the same`
    }
  },
  passwordChangedAt: Date,
  passwordRestToken: String,
  passwrodResetExpires: Date
});

module.exports = mongoose.model('User', userSchema);
