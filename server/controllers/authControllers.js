const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      // every credentials are required
     return res.status(400).json({message: "fullname, email and password are required!"});
    }
      // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({message: "User already exists with this email, please Login!"});
    }
     // creating new user by hashing the password and generating token
      bcrypt.genSalt(10, (err, salt) => {
        if(err) return res.json({message: err.message});
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.json({message: err.message});
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          await user.save();
          let token = generateToken(user);
          res.cookie("token", token);
          res.status(201).json({message: "user created successfully!"});
        });
      });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports.loginUser = async (req, res) => {
  let {email, password} = req.body;
  let user = await userModel.findOne({email});

  if(!user) return res.status(401).json({message: "Email or Password incorrect!"});

  bcrypt.compare(password, user.password, (err, result) => {
    if(err) return res.json({message: err.message});
   if(result){
    let token = generateToken(user);
    res.cookie("token", token);
    res.status(201).json({message: "You can Login!"});
   } else {
    res.status(401).json({message: "Email or Password incorrect!"})
   }
  });
};

module.exports.logoutUser = async (req, res) => {
  res.cookie("token", "");
  res.json({message: "logged out!"})
};