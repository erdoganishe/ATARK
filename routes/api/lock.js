const express = require('express');
const router = express.Router();
const lockController = require('../../controller/lockController');
const { verifyJWT } = require('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, lockController.getUserLocks)
    .post(verifyJWT, lockController.createNewLock)
    .put(verifyJWT, lockController.updateLock);

router.route('/:id')
    .get(verifyJWT, lockController.getLockbyId);

module.exports = router;