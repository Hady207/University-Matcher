const express = require('express');
const universityController = require('../controllers/universityController');
const reviewRouter = require('../routes/reviewRoute');
const authController = require('../controllers/authController');

const router = express.Router();

router.use('/:uniId/review', reviewRouter);

router
  .route('/')
  .get(universityController.getAllUni)
  .post(universityController.createUni);

router
  .route('/:id')
  .get(universityController.getUni)
  .post(authController.protect, universityController.favoriteUni)
  .patch(
    authController.protect,
    universityController.uploadUniversityImages,
    universityController.resizeUniversityImages,
    universityController.updateUni
  )
  .delete(universityController.deleteUni);

router.post(
  '/:id/favourite',
  authController.protect,
  universityController.removeFavorite
);
module.exports = router;
