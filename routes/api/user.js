const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../../controller/userController');
const logoutController = require('../../controller/auth/logoutController');
const authController = require('../../controller/auth/authController');
const { verifyJWT } = require('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, userController.getUser)
    .put(verifyJWT, userController.updateUser);

router.route('/:id')
    .get(verifyJWT, userController.getUserById)
    .post(verifyJWT, userController.deleteUser);

module.exports = router;