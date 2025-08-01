const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/TodoApp")
  .then(() => {
    console.log("Mongodb connected!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose.connection;
