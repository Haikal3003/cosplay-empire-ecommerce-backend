const express = require('express');
const { login, register } = require('../controllers/authController');
const passport = require('../config/passport');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  return res.status(200).json({
    user: req.user.user,
    token: req.user.token,
    message: 'Login with google successfully!',
  });
});

module.exports = router;
