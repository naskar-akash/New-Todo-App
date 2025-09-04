const mongoose = require("mongoose");
// const prodDebg = require("debug")("production:mongoose");
// const devpDebg = require("debug")("development:mongoose");

;( async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONGODB_URI}/TodoApp`)
    console.log(`Database connected! \n host: ${response.connection.host}`);
  } catch (error) {
    console.log("Database connection error: ",error);
    process.exit(1);
  }
})()

module.exports = mongoose.connection;
