const factory = require('./handlerFactory');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setUniUserId = (req, res, next) => {
  req.body.user = req.user.id;
  req.body.university = req.params.uniId;
  next();
};

exports.createReviewForm = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);
  if (!review) console.log('error');
  console.log(review);
  res.redirect('back');
});

exports.getReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.removeReview = factory.deleteOne(Review);
