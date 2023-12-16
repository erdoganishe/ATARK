const express = require('express');
const router = express.Router();
const lockController = require('../../controller/lockController');
const { verifyJWT, verifyJWTMobile } = require('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, lockController.getUserLocks)
    .post(verifyJWT, lockController.createNewLock)
    .put(verifyJWT, lockController.updateLock);

router.route('/:id')
    .get(verifyJWT, lockController.getLockbyId)
    .post(verifyJWT, lockController.deleteLock);

module.exports = router;