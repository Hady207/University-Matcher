const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

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
  if (!user) {
    return next(new AppError('no user with given id', 400));
  }
  user.follow(req.params.id);

  const friend = await User.findByIdAndUpdate(req.params.id, {
    $push: { followers: req.user.id }
  });

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
  const friend = await User.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { followers: req.user.id }
    },
    { new: true, safe: true, multi: true }
  );

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
