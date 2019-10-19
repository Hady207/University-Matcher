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
  const Filtered = filteredObj(req.body, 'name', 'email');
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

exports.getAllUser = factory.getAll(User);
exports.getUser = factory.getOne(User);
// DO NOT update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
