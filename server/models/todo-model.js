const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todoTitle: String,
  todoDesc: String,
  date: { type: Date, default: Date.now },
  status: String
});

module.exports = mongoose.model("todo", todoSchema);