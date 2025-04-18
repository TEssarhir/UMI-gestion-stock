const express = require('express');
const { authUser } = require('../controllers/userController');

const router = express.Router();

// Login route
router.post('/login', authUser);

module.exports = router;