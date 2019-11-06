const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Pusher = require('pusher');

// const pusher = new Pusher({
//   appId: process.env.PUSHER_appId,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
//   encrypted: process.env.PUSHER_ENCRYPTED
// });

// pusher.trigger('my-channel', 'my-event', {
//   message: 'hello world'
// });

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

  // channels_client.trigger('.commentSection', 'new_comment', comment);
  post.save(err => console.log('success'));

  res.status(201).json({
    status: 'success',
    data: {
      msg: 'Thanks for posting',
      comment
    }
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.updateOne(
    { _id: req.params.id },
    { $pull: { comments: { _id: req.params.commentId } } },
    { safe: true, multi: true }
  );

  res.status(204).json({
    status: 'success'
  });
});

exports.hitLike = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    $push: { likes: req.user.id }
  });

  // pusher.trigger('like-channel','post-action',{postId: req.params.id},req.body.socketId)

  res.status(201).json({
    status: 'success',
    message: 'you hit the like button'
  });
});

exports.hitdisLike = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    $pull: { likes: req.user.id }
  });

  res.status(201).json({
    status: 'success',
    message: 'you hit the dislike like button'
  });
});
