const express = require('express');
const router = express.Router();
const lockController = require('../../controller/lockController');
const { verifyJWT } = require('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, lockController.getUserLocks)
    .post(lockController.createNewLock)
    .put(lockController.updateLock);

router.route('/:id')
    .get(lockController.getLockbyId);

module.exports = router;