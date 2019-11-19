const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/postReview')
  .post(reviewController.setUniUserId, reviewController.createReviewForm);

router
  .route('/')
  .get(reviewController.getReviews)
  .post(
    authController.restrictTo('student'),
    reviewController.setUniUserId,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('student', 'admin'),
    reviewController.updateReview,
  )
  .delete(
    authController.restrictTo('student', 'admin'),
    reviewController.removeReview,
  );

module.exports = router;
