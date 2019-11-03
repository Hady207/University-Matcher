const express = require('express');
const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(postsController.getPosts)
  .post(
    authController.protect,
    postsController.setUserId,
    postsController.createPost
  );

router
  .route('/:id')
  .post(
    authController.protect,
    postsController.setUserId,
    postsController.createComment
  );

router.delete('/:id/comments/:commentId', postsController.deleteComment);

router.route('/:id/like').post(authController.protect, postsController.hitLike);
//   .patch(postsController.setUserId, postsController.createComment);

module.exports = router;
