const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UsersModel = mongoose.model("user", usersSchema);

module.exports = UsersModel;
