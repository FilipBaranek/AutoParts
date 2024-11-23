const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index");
});
  
router.get('/login', (req, res) => {
    res.sendFile("login.html", { root: "./src/views" });
});
  
router.get('/register', (req, res) => {
    res.sendFile("signin.html", { root: "./src/views" });
});

module.exports = router;