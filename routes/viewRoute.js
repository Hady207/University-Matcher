const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.home);
router.get('/signup', authController.isLoggedIn, viewController.signUp);
router.get('/login', authController.isLoggedIn, viewController.login);
router.get(
  '/universities',
  authController.isLoggedIn,
  viewController.universities
);
router.get(
  '/universities/:slug',
  authController.isLoggedIn,
  viewController.universityOne
);
router.get('/campus', authController.isLoggedIn, viewController.campus);
router.get('/dashboard', authController.protect, viewController.dashboard);

module.exports = router;
