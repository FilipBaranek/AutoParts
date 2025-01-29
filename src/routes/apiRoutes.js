const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const carsController = require("../controllers/carsController");
const partsController = require("../controllers/partsController");
const ratingsController = require("../controllers/ratingsController");
const reviewController = require("../controllers/reviewController");
const uploadController = require("../controllers/uploadController");
const middlewares = require("../middlewares/storage");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/changepassword", authController.loggedIn, authController.changePassword);
router.post("/deleteaccount", authController.loggedIn, authController.deleteAccount);
router.post("/cars/brands", carsController.brands);
router.post("/cars/models", carsController.models);
router.post("/cars/engines", carsController.engines);
router.post("/parts/brands", partsController.brands);
router.post("/parts/sort", partsController.sort);
router.post("/ratings", ratingsController.ratings);
router.post("/ratings/user", ratingsController.postUserRating);
router.post("/ratings/create", ratingsController.createRating);
router.post("/ratings/delete", ratingsController.removeRating);
router.post("/review/create", reviewController.submit);
router.post("/review/find", reviewController.find);
router.post("/review/delete", reviewController.delete);
router.post("/review/edit", reviewController.edit);
router.post("/upload", authController.loggedIn, middlewares.upload, uploadController.uploadPicture);



module.exports = router;
