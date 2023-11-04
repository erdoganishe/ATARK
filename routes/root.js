const express = require('express');
const router = express.Router();
const path = require('path');

// homepage
router.get('^/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view', 'index.html'));
});

// login
router.get('^/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/regpage', 'login.html'));
});

// registration
router.get('^/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/regpage', 'registration.html'));
});

module.exports = router;