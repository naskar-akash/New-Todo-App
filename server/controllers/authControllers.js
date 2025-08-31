const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const {generateToken} = require("../utils/generateToken");
const path = require("path");

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
    res.status(201).json({message: "Logged in successfully!"});
   } else {
    res.status(401).json({message: "Email or Password incorrect!"})
   }
  });
};

module.exports.logoutUser = async (req, res) => {
  res.cookie("token", "");
  res.json({message: "logged out!"})
};

module.exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userObj = user.toObject();
    if (user.profilepic?.data) {
      userObj.profilepic = `data:${user.profilepic.contentType};base64,${user.profilepic.data.toString("base64")}`;
    } else {
      userObj.profilepic = null;
    }
    res.status(200).json(userObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.updateProfilePic = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filename = crypto.randomBytes(16).toString("hex") + path.extname(req.file.originalname);
    await userModel.findByIdAndUpdate(
      req.user._id,
      {
        profilepic: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
          name: filename
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Profile pic updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteProfilePic = async (req, res) => {
  try{
    const user = await userModel.findById(req.user._id);
    if(!user || !user.profilepic){
      return res.status(404).json({message: "No profile picture to delete"});
    }
    user.profilepic = undefined;
    await user.save();
    res.status(200).json({message: "Profile picture deleted successfully"});
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}