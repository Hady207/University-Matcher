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
  viewController.universities,
);
router.get(
  '/universities/:slug',
  authController.isLoggedIn,
  viewController.universityOne,
);
router.get('/campus', authController.isLoggedIn, viewController.campus);
router.get('/dashboard', authController.protect, viewController.dashboard);
// router.get(
//   '/dashboard/:uni',
//   authController.protect,
//   viewController.dashboardUni
// );
router.get('/profile/:id', authController.protect, viewController.profile);

router.post('chatbot', viewController.chatbot);

module.exports = router;
