const express = require('express');
const { register, login, testAPI } = require('../controllers/auth');
const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/test', testAPI)

module.exports = router;