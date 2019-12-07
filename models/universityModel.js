const mongoose = require('mongoose');
const slugify = require('slugify');
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
    admissionRule: { type: String, required: true },
    coverImage: { type: String, required: ['true', 'Please Provide a image'] },
    images: [String],
    slug: String,
    programs: [
      { type: String, enum: ['diploma', 'bachelor', 'masters', 'phd'] }
    ],
    majors: [String],
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
    location: {
      // geoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    priceAverage: Number,
    certificates: [String],
    numOfStudents: Number
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

uniSchema.index({ slug: 1 });

// VIRTUAL POPULATE
uniSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'university', //name of the field in the other model
  localField: '_id'
});

uniSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('University', uniSchema);
