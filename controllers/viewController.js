const University = require('../models/universityModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.home = catchAsync(async (req, res, next) => {
  res.render('home', { title: 'Home', url: '/' });
});

exports.universities = catchAsync(async (req, res, next) => {
  res.render('universities');
});

exports.universityOne = catchAsync(async (req, res, next) => {
  res.render('universityOne');
});

exports.signUp = catchAsync(async (req, res, next) => {
  res.render('signup');
});

exports.login = catchAsync(async (req, res, next) => {
  res.render('login');
});

exports.campus = catchAsync(async (req, res, next) => {
  res.render('campus');
});

exports.dashboard = catchAsync(async (req, res, next) => {
  res.render('dashboard');
});
