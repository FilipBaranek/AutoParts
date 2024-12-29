const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const carsController = require("../controllers/carsController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/changepassword", authController.loggedIn, authController.changePassword);
router.post("/deleteaccount", authController.loggedIn, authController.deleteAccount);
router.post("/cars/brands", carsController.brands);
router.post("/cars/models", carsController.models);
router.post("/cars/engines", carsController.engines);

module.exports = router;
