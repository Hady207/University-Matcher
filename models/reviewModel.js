const mongoose = requrie('mongoose');
const university = require('./universityModel');

const reviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: [true, 'Review can not be empty!'] },
    rating: { type: Number, required: true, min: 1, max: 5 },
    uni: {
      type: mongoose.Schema.ObjectId,
      ref: 'uni',
      required: [true, 'Review must belong to a tour']
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

module.exports = mongoose.model('Review', reviewSchema);
