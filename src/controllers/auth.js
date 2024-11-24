const express = require('express');
const register = require('./register');
const login = require('./login');
const changepassword = require('./changepassword');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/changepassword", changepassword);

module.exports = router;