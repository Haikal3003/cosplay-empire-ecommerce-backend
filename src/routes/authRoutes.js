const express = require('express');
const { login, register } = require('../controllers/authController');
const passport = require('../config/passport');

const router = express.Router();

router.post('/auth/login', login);
router.post('/auth/register', register);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  return res.status(200).json({
    user: req.user.user,
    token: req.user.token,
    message: 'Login with google successfully!',
  });
});

module.exports = router;
