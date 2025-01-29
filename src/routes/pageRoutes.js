const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');
const partsController = require('../controllers/partsController');
const ratingController = require('../controllers/ratingsController');


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


router.get('/changepassword', authController.loggedIn, (req, res) => {
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


router.get('/category',
    (req, res, next) => {
        if (!req.query.catName || !req.query.engine)
        {
            res.status(404).send('Page Not Found');
            return;
        }
        req.catData = req.query;
        next();
    },
    categoryController.categories,
    (req, res) => {
        if (req.subcat)
        {
            res.render("category", { subcat: req.subcat });
        }
        else
        {
            res.status(404).send('Page Not Found');
        }
    }
);


router.get('/parts',
    (req, res, next) => {
        if (!req.query.search || (!req.query.code && (!req.query.subcat || !req.query.engine)))
        {
            res.status(404).send('Page Not Found');
            return;
        }
        req.partData = req.query;
        next();
    },
    partsController.parts,
    (req, res) => {
        res.render("parts", { parts: req.parts });
    }
);


router.get('/product',
    authController.loggedIn,
    (req, res, next) => {
        if (!req.query.code)
        {
            res.status(404).send('Page Not Found');
            return;
        }
        req.partData = req.query;
        req.partData.search = "code";

        req.ratingData = {};
        req.ratingData.code = req.query.code;
        req.ratingData.userId = req.user ? req.user.id : -1;

        next();
    },
    partsController.parts,
    ratingController.getUserRating,
    (req, res) => {
        if (req.parts)
        {
            res.render("product", { user: req.user, product: req.parts, rating: req.rating });
        }
        else
        {
            res.status(404).send('Page Not Found');
        }
    }
);


router.get("/profilepicture", authController.loggedIn, (req, res) => {
    if (req.user)
    {
        res.sendFile("profilepicture.html", { root: "./src/views" });
    }
    else
    {
        res.redirect("/login");
    }
});


router.get("/logout", authController.logout);


module.exports = router;