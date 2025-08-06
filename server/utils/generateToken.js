const jwt = require("jsonwebtoken");

const generateToken = (user) => {
     if (!user) {
        throw new Error("User object is null!");
    }
    return jwt.sign({ email: user.email, id: user._id },process.env.JWT_KEY);
};

module.exports.generateToken = generateToken;
 