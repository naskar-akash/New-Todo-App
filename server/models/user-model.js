const mongoose = require("mongoose");
const {dateTime} = require("../utils/dateTime");

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
  date: { 
    type: String, 
    default: () => dateTime().date 
  },
  time: { 
    type: String, 
    default: () => dateTime().time 
  },  
  
});

module.exports = mongoose.model("user", userSchema);