const express = require('express');
const loggedIn = require('../controllers/loggedin');
const logout = require('../controllers/logout');
const router = express.Router();

router.get('/', loggedIn, (req, res) => {
    if (req.user)
    {
        res.render("index", {status: "loggedIn", user: req.user});
    }
    else
    {
        res.render("index", {status: "loggedOut", user: "non"});
    }
});
  
router.get('/login', loggedIn, (req, res) => {
    if (req.user)
    {
        res.redirect('/profile');
    }
    else
    {
        res.sendFile("login.html", { root: "./src/views" });
    }
});


router.get('/register', loggedIn, (req, res) => {
    if (req.user)
    {
        res.redirect('/profile');
    }
    else
    {
        res.sendFile("signin.html", { root: "./src/views" });
    }
});

router.get('/profile', loggedIn, (req, res) => {
    if (req.user) 
    {
        res.render("profile", { user: req.user });
    }
    else
    {
        res.redirect('/login');
    }
})

router.get('/changepassword', loggedIn, (req, res) => {
    if (req.user)
    {
        res.sendFile("changepassword.html", { root: "./src/views", user: req.user });
    }
    else
    {
        res.redirect('/login');
    }
})

router.get("/logout", logout);

module.exports = router;