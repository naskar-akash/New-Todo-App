const express = require('express');
const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");
const db = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const port = 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//connecting routes
app.use("/user", userRouter);
app.use("/todos", todoRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})