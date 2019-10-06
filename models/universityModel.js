const mongoose = require('mongoose');

const uniSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      unique: true
    },
    abbrv: {
      type: String,
      maxlength: [6, 'Max character is 6 long'],
      unique: true,
      trim: true
    },
    email: String,
    website: String,
    description: {
      type: String,
      required: [true, `Please provide a description`]
    },
    admission: { type: String, required: true },
    image: { type: String, required: ['true', 'Please Provide a image'] },
    slug: String,
    programs: [
      { type: String, enum: ['diploma', 'bachelore', 'masters', 'phd'] }
    ],
    courses: [String],
    address: String,
    ratingQuantity: {
      type: Number,
      default: 0
    },
    ratingAverage: {
      type: Number,
      default: 3.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.66666, 47, 4.7
    },
    location: String
  },
  { timestamps: true }
);

const University = mongoose.model('University', uniSchema);
module.exports = University;
