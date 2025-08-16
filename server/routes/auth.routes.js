const express = require('express');
const { signUp, logIn } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', logIn);

module.exports = authRouter;





















