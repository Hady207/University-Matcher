const mongoose = require('mongoose');
const University = require('./universityModel');

const reviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: [true, 'Review can not be empty!'] },
    rating: { type: Number, required: true, min: 1, max: 5 },
    university: {
      type: mongoose.Schema.ObjectId,
      ref: 'University',
      required: [true, 'Review must belong to a university']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo '
  });
  // this.populate('user', 'name');
  return next();
});

// statics methods are called on the model
reviewSchema.statics.calcAverageRatings = async function(universityId) {
  const stats = await this.aggregate([
    {
      $match: { university: universityId }
    },
    {
      $group: {
        _id: '$university',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await University.findByIdAndUpdate(universityId, {
      ratingQuantity: stats[0].nRating,
      ratingAverage: stats[0].avgRating
    });
  } else {
    await University.findByIdAndUpdate(universityId, {
      ratingsQuantity: 0,
      ratingsAverage: 3.5
    });
  }
};

reviewSchema.post('save', function() {
  // this points to current review
  // this constructor = MODEL
  this.constructor.calcAverageRatings(this.university);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  await this.r.constructor.calcAverageRatings(this.r.university);
});

module.exports = mongoose.model('Review', reviewSchema);
