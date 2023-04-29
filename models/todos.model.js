const mongoose = require("mongoose");

const todosSchema = mongoose.Schema({
  user: String,
  title: String,
  body: String,
  isCompleted: Boolean,
});

const TodosModel = mongoose.model("todo", todosSchema);

module.exports = TodosModel;