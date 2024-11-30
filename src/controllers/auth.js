const express = require('express');
const register = require('./register');
const login = require('./login');
const changepassword = require('./changepassword');
const cars = require('./cars');
const deleteaccount = require('./deleteaccount');
const loggedIn = require('./loggedIn');
const category = require('./category');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/changepassword", loggedIn, changepassword);
router.post("/cars", cars);
router.post("/deleteaccount", loggedIn, deleteaccount);
router.post("/category", category);

module.exports = router;