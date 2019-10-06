const express = require('express');
const universityController = require('../controller/universityController');
const router = express.Router();

router
  .route('/')
  .get(universityController.getAllUni)
  .post(universityController.createUni);

router
  .route('/:id')
  .get(universityController.getUni)
  .patch(universityController.updateUni)
  .delete(universityController.deleteUni);

module.exports = router;
