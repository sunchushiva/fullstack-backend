const express = require("express");
const todosRoute = require("./routes/todos.route");
const connection = require("./config/mongo");
const userRoute = require("./routes/user.route");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/todos", todosRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT, async () => {
  console.log(`Server started at ${process.env.PORT} port`);
  try {
    await connection;
    console.log("MongoDB connected");
  } catch (err) {
    console.log({ message: err.message });
  }
});
