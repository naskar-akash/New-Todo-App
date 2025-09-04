const dotenv = require("dotenv");

// Load correct .env file depending on NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
});

require("./config/mongoose-connection");
const express = require('express');
const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URI, credentials: true }));
app.use(bodyParser.json());

//connecting routes
app.use("/user", userRouter);
app.use("/todos", todoRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`);
})

