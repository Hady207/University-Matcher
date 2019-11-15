const multer = require('multer');
const sharp = require('sharp');

const factory = require('./handlerFactory');
const University = require('../models/universityModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUniversityImages = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

// upload.single('images') req.file
// upload.array('images',5) req.files

exports.resizeUniversityImages = catchAsync(async (req, res, next) => {
  // console.log(req.files);
  if (!req.files.coverImage || !req.files.images) return next();

  // 1) Cover image
  req.body.coverImage = `university-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.coverImage[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/universities/${req.body.coverImage}`);

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `university-${req.params.id}-${Date.now()}-${i +
        1}.jpeg`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/universities/${filename}`);
      req.body.images.push(filename);
    }),
  );
  next();
});

// exports.getAllUni = factory.getAll(University);

// TESTing purpose
exports.getAllUni = catchAsync(async (req, res, next) => {
  const university = await University.find;
});
exports.getUni = factory.getOne(University, { path: 'reviews' });
exports.createUni = factory.createOne(University);
exports.updateUni = factory.updateOne(University);
exports.deleteUni = factory.deleteOne(University);

exports.favoriteUni = catchAsync(async (req, res, next) => {
  //   const user = await User.findByIdAndUpdate(req.user._id, {
  //     favoriteUni: { $push: { _id: req.params.id } }
  //   });
  // console.log(req.user);
  let user;
  if (req.user.favoriteUni.some(val => val.id == req.params.id)) {
    // console.log('it does include it');
    user = await User.updateOne(
      { _id: req.user.id },
      { $pull: { favoriteUni: req.params.id } },
      { new: true, safe: true, multi: true },
    );
    // user = await User.findByIdAndUpdate(
    //   req.user.id,
    //   { $pull: { favoriteUni: { _id: req.params.id } } },
    //   { new: true, safe: true, multi: true }
    // );
    // console.log(user);

    res.status(201).json({
      status: 'removed',
      message: 'removed from favorite',
    });
  } else {
    user = await User.updateOne(
      { _id: req.user.id },
      { $push: { favoriteUni: { _id: req.params.id } } },
      { safe: true, multi: true },
    );
    // console.log(user);
    res.status(201).json({
      status: 'added',
      message: 'added to favorite',
    });
  }

  // console.log(user);
  // if (!user) {
  //   next(new appError('you must sign in', 401));
  // }

  // res.status(201).json({
  //   status: 'success',
  //   message: 'added/removed to favorite'
  // });
});

// exports.getAllUni = catchAsync(async (req, res, next) => {
//   const uni = await University.find({});
//   res.status(200).json({
//     message: "hello",
//     data: {
//       uni,
//     },
//   });
// });

exports.removeFavorite = catchAsync(async (req, res, next) => {
  if (req.user.favoriteUni.includes(req.params.id)) {
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { favoriteUni: req.params.id },
    });
    // console.log(user);
    res.status(201).json({
      status: 'success',
      message: 'removed from favorite',
    });
  } else {
    res.status(201).json({
      status: 'failed',
      message: 'this is not in your favorite list',
    });
  }
});
