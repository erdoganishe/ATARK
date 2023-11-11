const express = require('express');
const router = express.Router();

const authController = require('../controller/auth/authController');
const logoutController = require('../controller/auth/logoutController');
const refreshTokenController = require('../controller/auth/refreshTokenController');
const registerController = require('../controller/auth/registerController');

router.post('/register', registerController.handleNewUser);
router.get('/refresh', refreshTokenController.handleRefreshToken);
router.get('/logout', logoutController.handleLogout);
router.post('/login', authController.handleLogin);
router.post('/login-mobile', authController.handleLoginMobile);

module.exports = router;