const mongoose = require("mongoose");
const {dateTime} = require("../utils/dateTime");

const todoSchema = new mongoose.Schema({
  todoTitle: {
    type: String,
    required: true
  },
  todoDesc: {
    type: String,
    required: true
  },
  date: { 
    type: String, 
    default: dateTime().date 
  },
  time: { 
    type: String, 
    default: dateTime().time 
  },
  status: {
    type: String,
    default: "Unseen"
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }]
});

module.exports = mongoose.model("todo", todoSchema);