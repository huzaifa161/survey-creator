const express = require('express');
const { request } = require('express');

const router = express.Router();
const { signUp, signIn, signOut, requireAuth, isSignIn } = require('../controllers/auth');

router.post('/create-user', signUp);
router.post('/signin-user', signIn);

router.post('/check-sign-in', requireAuth, isSignIn);

router.get('/sign-out', signOut);
module.exports = router;