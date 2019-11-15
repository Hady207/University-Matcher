const University = require('../models/universityModel');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.home = catchAsync(async (req, res, next) => {
  let query;
  if (!req.user) {
    query = University.find({ ratingAverage: { $gte: 3 } })
      .sort('-createdAt')
      .limit(3);
  } else {
    query = await University.find({
      $or: [{ majors: req.user.majors }, { programs: req.user.program }],
    });
  }
  const top3 = await query;

  // console.log(top3);
  res.render('home', { title: 'Home', url: '/', top3 });
});

exports.universities = catchAsync(async (req, res, next) => {
  const universities = await University.find({});
  res.render('universities', { title: 'Universities', universities });
});

exports.universityOne = catchAsync(async (req, res, next) => {
  const one = await University.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!one) {
    return next(new AppError('There is no one with that name.', 404));
  }

  res.render('universityOne', {
    title: `Hello ${one.name}`,
    university: one,
  });
});

exports.signUp = catchAsync(async (req, res, next) => {
  res.render('signup', { title: 'sign up' });
});

exports.login = catchAsync(async (req, res, next) => {
  res.render('login', { title: 'login' });
});

exports.campus = catchAsync(async (req, res, next) => {
  const posts = await Post.find({}).sort('-createdAt');
  console.log('posts', posts);
  res.render('campus', { title: 'campus', posts });
});

exports.dashboard = catchAsync(async (req, res, next) => {
  const universities = await University.find({});
  const reviews = await Review.find({});
  const users = await User.find({});
  res.render('dashboard', { title: 'dashboard', universities, reviews, users });
});

exports.me = catchAsync(async (req, res, next) => {
  res.render('me');
});

exports.profile = catchAsync(async (req, res, next) => {
  const friend = await User.findById(req.params.id);
  res.render('friend', { title: 'Welcome', friend });
});

exports.chatbot = catchAsync(async (req, res, next) => {
  let university;
  if (req.params.programs) {
    university = await University.findById(req.params.programs).select('abbrv');
  }
  res.json({
    fulfillmentText: `you can find what you looking for here ${university}`,
  });
});
