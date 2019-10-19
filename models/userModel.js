const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

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
      message: `Passwords are not the same`
    }
  },
  passwordChangedAt: Date,
  passwordRestToken: String,
  passwrodResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', async function(next) {
  // Only run this function if password is actually modified
  if (!this.isModified('password')) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// instances method

userSchema.methods.correctPassword = async function(
  bodyPassword,
  userPassword
) {
  return bcrypt.compare(bodyPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp; //100<300
  }
  return false;
};

userSchema.methods.createPasswordResetToken = async function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordRestToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  console.log({ resetToken }, this.passwordResetToken);
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
