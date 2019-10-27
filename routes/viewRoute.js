const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.home);
router.get('/signup', viewController.signUp);
router.get('/login', viewController.login);
router.get('/universities', viewController.universities);
router.get('/universities/:slug', viewController.universityOne);
router.get('/campus', viewController.campus);
router.get('/dashboard', viewController.dashboard);

module.exports = router;
