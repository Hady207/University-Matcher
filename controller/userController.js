const User = require('../models/userModel');
const catchAsync = require('../utils/appError');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUser = factory.getAll(User);
exports.getUser = factory.getOne(User);
// DO NOT update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
