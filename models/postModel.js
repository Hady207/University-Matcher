const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: String,
  user: {
    id: String,
    name: String,
    photo: String
  }
});

const postSchema = new mongoose.Schema(
  {
    post: String,
    likes: {
      type: Number,
      default: 0
    },
    comments: [commentSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });

  return next();
});

const post = mongoose.model('Post', postSchema);
module.exports = post;
