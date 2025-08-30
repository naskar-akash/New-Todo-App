const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const {registerUser, loginUser, logoutUser, getCurrentUser,updateProfilePic,deleteProfilePic } = require("../controllers/authControllers");
const { isLoggedin } = require("../middlewares/isLoggedin");


router.get("/", (req, res) => {
  res.send("User page");
});

// Route to register a new user
router.post("/register", registerUser);

// Route to login the registered user
router.post("/login", loginUser); 

// Route to logout the loggedin user
router.post("/logout", logoutUser);

// Route to get current loggedin user details
router.get("/me", isLoggedin, getCurrentUser);

// Route to get user profile
router.get("/profile", isLoggedin, getCurrentUser);

// Route to update user profile picture
router.post("/profile/pic", isLoggedin, upload.single("profilepic"), updateProfilePic);

//Route to delete profile picture
router.delete("/profile/pic", isLoggedin, deleteProfilePic);

module.exports = router;
