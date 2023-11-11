const express = require('express');
const router = express.Router();
const path = require('path');

const { verifyJWT, verifyJWTMobile } = require('../middleware/verifyJWT');

const fileUpload = require('express-fileupload');
const filesPayloadExists = require('../middleware/filesPayloadExists');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');
const fileSaver = require('../middleware/fileSaver');

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

router.post('/fileUpload',
    verifyJWT,
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png']),
    fileSizeLimiter,
    fileSaver)

module.exports = router;