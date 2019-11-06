const factory = require('./handlerFactory');
const University = require('../models/universityModel');
const User = require('../models/userModel');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUni = factory.getAll(University);
exports.getUni = factory.getOne(University, { path: 'reviews' });
exports.createUni = factory.createOne(University);
exports.updateUni = factory.updateOne(University);
exports.deleteUni = factory.deleteOne(University);

exports.favoriteUni = catchAsync(async (req, res, next) => {
  //   const user = await User.findByIdAndUpdate(req.user._id, {
  //     favoriteUni: { $push: { _id: req.params.id } }
  //   });
  console.log(req.user);
  let user;
  if (req.user.favoriteUni.includes(req.params.id)) {
    console.log('it does include it');
    user = await User.updateOne(
      { _id: req.user.id },
      { $pull: { favoriteUni: req.params.id } },
      { new: true, safe: true, multi: true }
    );
    // user = await User.findByIdAndUpdate(
    //   req.user.id,
    //   { $pull: { favoriteUni: { _id: req.params.id } } },
    //   { new: true, safe: true, multi: true }
    // );
    console.log(user);

    res.status(201).json({
      status: 'removed',
      message: 'removed from favorite'
    });
  } else {
    user = await User.updateOne(
      { _id: req.user.id },
      { $push: { favoriteUni: { _id: req.params.id } } },
      { safe: true, multi: true }
    );
    console.log(user);
    res.status(201).json({
      status: 'added',
      message: 'added to favorite'
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
      $pull: { favoriteUni: req.params.id }
    });
    console.log(user);
    res.status(201).json({
      status: 'success',
      message: 'removed from favorite'
    });
  } else {
    res.status(201).json({
      status: 'faild',
      message: 'this is not in your favorite list'
    });
  }
});
