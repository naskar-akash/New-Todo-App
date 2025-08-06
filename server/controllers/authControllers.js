const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      // every credentials are required
      res.status(400).send("fullname, email and password are required!");
    }
      // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists with this email, please Login!");
    }
     // creating new user by hashing the password and generating token
      bcrypt.genSalt(10, (err, salt) => {
        if(err) return res.send(err.message);
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.send(err.message);
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          await user.save();
          let token = generateToken(user);
          res.cookie("token", token);
          res.status(201).send("user created successfully!");
        });
      });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).send("Server error");
  }
};

module.exports.loginUser = async (req, res) => {
  let {email, password} = req.body;
  let user = await userModel.findOne({email});

  if(!user) return res.send("Email or Password incorrect!");

  bcrypt.compare(password, user.password, (err, result) => {
    if(err) return res.send(err.message);
   if(result){
    let token = generateToken(user);
    res.cookie("token", token);
    res.send("You can Login!");
   } else {
    res.send("Email or Password incorrect!")
   }
  });
};

module.exports.logoutUser = async (req, res) => {
  res.cookie("token", "");
  res.send("logged out!")
};