const express = require("express");
const router = express.Router();
const {isLoggedin} = require("../middlewares/isLoggedin")
const {registerUser, loginUser, logoutUser} = require("../controllers/authControllers");
const userModel = require("../models/user-model");


router.get("/", (req, res) => {
  res.send("User page");
});

// Route to register a new user
router.post("/register", registerUser);

// Route to login the registered user
router.post("/login", loginUser); 

// Route to logout the loggedin user
router.post("/logout", logoutUser);

module.exports = router;
