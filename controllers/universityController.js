const factory = require('./handlerFactory');
const University = require('../models/universityModel');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUni = factory.getAll(University);
exports.getUni = factory.getOne(University, { path: 'reviews' });
exports.createUni = factory.createOne(University);
exports.updateUni = factory.updateOne(University);
exports.deleteUni = factory.deleteOne(University);

// exports.getAllUni = catchAsync(async (req, res, next) => {
//   const uni = await University.find({});
//   res.status(200).json({
//     message: "hello",
//     data: {
//       uni,
//     },
//   });
// });
