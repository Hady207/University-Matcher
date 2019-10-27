const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const filteredObj = (obj, ...allowedFields) => {
  const filtObj = {};
  const keys = Object.keys(obj);
  keys.forEach(element => {
    if (allowedFields.includes(element)) filtObj[element] = obj[element];
  });
  return filtObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return new AppError(
      'This route is not for password updates. Please use /updateMyPassword.',
      400
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be unwanted
  const filtered = filteredObj(req.body, 'name', 'email');
  if (req.file) filtered.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filtered, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.follow = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  // const friend = await User.findById(req.params.id);
  console.log('me', user);
  // console.log('you', friend);
  if (!user) {
    return next(new AppError('no user with given id', 400));
  }
  user.follow(req.params.id);

  // console.log(friend.followers);
  // friend.followers.push(user._id);
  // console.log(friend.followers);
  // friend.save({ validateBeforeSave: false });
  const friend = await User.findByIdAndUpdate(req.params.id, {
    $push: { followers: req.user.id }
  });
  console.log(friend);
  res.status(200).json({
    status: 'success',
    message: `you followed this user ${friend.name}`,
    data: {
      user
    }
  });
});

// 96f359d51a6fee0a5dd2f5e77e4a921c16be2a5a

exports.unfollow = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('no user with given id', 400));
  }
  user.unfollow(req.params.id);
  const friend = await User.findByIdAndUpdate(req.params.id, {
    $pull: { followers: req.user.id }
  });
  // friend.followers.pop(user._id);
  // friend.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    message: `you unfollowed this ${friend.name}`,
    data: {
      user
    }
  });
});

exports.getAllUser = factory.getAll(User);
exports.getUser = factory.getOne(User);
// DO NOT update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);