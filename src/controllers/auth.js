const express = require('express');
const register = require('./register');
const login = require('./login');
const changepassword = require('./changepassword');
const cars = require('./cars');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/changepassword", changepassword);
router.get("/cars", cars);

module.exports = router;