const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

const isLoggedin = async (req, res, next) => {
    if(!req.cookies.token) {
        res.send("Login first!");
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email }).select("-password");
        req.user = user;
        next();
    } catch (error) {
        res.send(error.message);
    }
}

module.exports.isLoggedin = isLoggedin;