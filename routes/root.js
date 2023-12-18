const express = require('express');
const router = express.Router();
const path = require('path');

const { verifyJWT, verifyJWTMobile } = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles_list');
const userController = require('../controller/userController');

const fileUpload = require('express-fileupload');
const filesPayloadExists = require('../middleware/filesPayloadExists');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');
const fileSaver = require('../middleware/fileSaver');
const lockController = require('../controller/lockController');

// homepage
router.get('^/$|/unauth', (req, res) => {
    res.sendFile(path.join(__dirname, '../view', 'index.html'));
});

// login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/regpage', 'login.html'));
});

// registration
router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/regpage', 'registration.html'));
});

// profile
router.get('/profile', verifyJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '../view/profile', 'index.html'));
});

// lock
router.get('/lock', verifyJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '../view/lock', 'index.html'));
});

// newLock
router.get('/newlock', verifyJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '../view/newLock', 'index.html'));
});

// main - lock list
router.get('/main', verifyJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '../view/main', 'index.html'));
});

// upload file
router.post('/fileUpload',
    verifyJWT,
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png']),
    fileSizeLimiter,
    fileSaver)

// get lock data on mob
router.route('/lock-mob')
    .get(verifyJWTMobile, 
        lockController.getAllLocks)
    .put(verifyJWTMobile,lockController.updateLock);
router.route('/lock-mob/:id')
    .get(lockController.getLockbyId);
router.route('/lock-mob-by-uid/:id')
    .get(lockController.getLockByUId);

// admnin panel
router.route('/admin-panel')
    .get(verifyJWT, 
        verifyRoles(ROLES_LIST.Admin), (req, res) => {
        res.sendFile(path.join(__dirname, '../view/admin', 'admin.html'));
    });
router.route('/users')
    .get(verifyJWT, 
        verifyRoles(ROLES_LIST.Admin), userController.getAllUser);

module.exports = router;