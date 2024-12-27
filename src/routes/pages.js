const express = require('express');
const loggedIn = require('../controllers/loggedIn');
const logout = require('../controllers/logout');
const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile("index.html", { root: "./src/views" });
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

router.get('/deleteaccount', loggedIn, (req, res) => {
    if (req.user)
    {
        res.sendFile("deleteaccount.html", { root: "./src/views", user: req.user });
    }
    else
    {
        res.redirect('/login');
    }
})

router.get('/category', (req, res) => {
    res.sendFile("category.html", { root: "./src/views" });
});

router.get('/parts', (req, res) => {
    res.sendFile("parts.html", { root: "./src/views" });
});

router.get("/logout", logout);


module.exports = router;