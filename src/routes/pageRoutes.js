const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');


router.get('/', (req, res) => {
    res.sendFile("index.html", { root: "./src/views" });
});
  
router.get('/login', authController.loggedIn, (req, res) => {
    if (req.user)
    {
        res.redirect('/profile');
    }
    else
    {
        res.sendFile("login.html", { root: "./src/views" });
    }
});

router.get('/register', authController.loggedIn, (req, res) => {
    if (req.user)
    {
        res.redirect('/profile');
    }
    else
    {
        res.sendFile("signin.html", { root: "./src/views" });
    }
});


router.get('/profile', authController.loggedIn, (req, res) => {
    if (req.user) 
    {
        res.render("profile", { user: req.user });
    }
    else
    {
        res.redirect('/login');
    }
})



const changePasswordLimiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 5,
    message: "Príliš veľa pokusov, alebo vypršal čas, skúste to neskôr"
});

router.get('/changepassword', changePasswordLimiter, authController.loggedIn, (req, res) => {
    if (req.user)
    {
        res.sendFile("changepassword.html", { root: "./src/views" });
    }
    else
    {
        res.redirect('/login');
    }
})


router.get('/deleteaccount', authController.loggedIn, (req, res) => {
    if (req.user)
    {
        res.sendFile("deleteaccount.html", { root: "./src/views" });
    }
    else
    {
        res.redirect('/login');
    }
})

/*
router.get('/category', (req, res) => {
    res.sendFile("category.html", { root: "./src/views" });
});

router.get('/parts', (req, res) => {
    res.sendFile("parts.html", { root: "./src/views" });
});
*/

router.get("/logout", authController.logout);


module.exports = router;