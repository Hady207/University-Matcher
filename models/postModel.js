const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: String,
  user: {
    id: String,
    name: String,
    photo: String
  }
});

const likesSchema = new mongoose.Schema({
  like: {
    type: Number,
    default: 0
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

const postSchema = new mongoose.Schema(
  {
    post: String,
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    comments: [commentSchema],
    user: {
      type: mongoose.Schema.ObjectId,
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
