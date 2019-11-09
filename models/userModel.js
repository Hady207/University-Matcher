const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const notificationSchema = new mongoose.Schema({
  notifiyText: String,
  user: {
    id: String,
    name: String,
    photo: String
  }
});

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
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
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
  favoriteUni: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'University'
    }
  ],
  major: String,
  programs: [{ type: String, enum: ['diploma', 'bachelore', 'master', 'phd'] }],
  program: {
    type: String,
    enum: ['diploma', 'bachelore', 'master', 'phd']
  },
  notifications: [notificationSchema],
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

userSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'following followers ',
    select: '-following -followers -programs -notifications'
  });

  return next();
});

userSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'favoriteUni ',
    select: 'name coverImage'
  });

  return next();
});

// instances method

userSchema.methods.follow = function(id) {
  if (this.following.indexOf(id) === -1) {
    this.following.push(id);
  }
  return this.save({ validateBeforeSave: false });
};
userSchema.methods.unfollow = function(id) {
  this.following.remove(id);
  return this.save({ validateBeforeSave: false });
};

userSchema.methods.isFollowing = function(id) {
  return this.following.some(function(followId) {
    return followId.toString() === id.toString();
  });
};

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

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
