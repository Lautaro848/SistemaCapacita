const express = require('express');
const router = express.Router();
const { showLogin, postLogin, logout } = require('../controllers/authController');

router.get('/login', showLogin);
router.post('/login', postLogin);
router.get('/logout', logout);

module.exports = router;