const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  email: String,
  password: String,
  profilepic: Buffer,
  todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "todo",
      },
    ],
});

module.exports = mongoose.model("user", userSchema);