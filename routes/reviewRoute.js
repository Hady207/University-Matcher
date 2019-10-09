const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getReviews)
  .post(reviewController.setUniUserId, reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.removeReview);

module.exports = router;
