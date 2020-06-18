const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
} = require('../controlers/auth');
const router = express.Router();
const { protect } = require('../middleware/auth'); //to protect some routes

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);

module.exports = router;
