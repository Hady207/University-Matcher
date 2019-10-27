const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.getPosts = factory.getAll(Post);
exports.createPost = factory.createOne(Post);

exports.getCommentswithposts = async (req, res, next) => {
  const posts = await posts.find({});
};

exports.createComment = catchAsync(async (req, res, next) => {
  const owner = { id: req.user.id, name: req.user.name, photo: req.user.photo };
  const writtenComment = { comment: req.body.comment, user: owner };
  const post = await Post.findById(req.params.id);
  const comment = post.comments.push(writtenComment);

  post.save(err => console.log('success'));

  res.status(201).json({
    status: 'success',
    data: {
      msg: 'Thanks for posting',
      comment
    }
  });
});

exports.hitLike = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    $inc: { likes: 1 }
  });

  res.status(201).json({
    status: 'success',
    message: 'you hit the like button'
  });
});
