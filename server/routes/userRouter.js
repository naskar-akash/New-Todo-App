const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  res.send("User page");
});

// Route to register a new user
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    let user = await userModel.findOne({email});

    if (!fullname || !email || !password) {
      // every credentials are required
      res.status(200).send("fullname, email and password are required!");
    } else if (!user) {
      // avoiding duplicate use creation
      let createdUser = await userModel.create({
        fullname,
        email,
        password,
      });
      await createdUser.save();
      res.status(200).send("user created successfully!");
    } else {
      res.status(200).send("You already have an account, Login there!");
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
});

module.exports = router;
