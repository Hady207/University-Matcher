const factory = require('./handlerFactory');
const Review = require('../models/reviewModel');

exports.setUniUserId = (req, res, next) => {
  req.body.user = req.user.id;
  req.body.university = req.params.uniId;
  console.log(req.body);
  next();
};

exports.getReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.removeReview = factory.deleteOne(Review);
