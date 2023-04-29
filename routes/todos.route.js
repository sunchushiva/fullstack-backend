const express = require("express");
const authorizeMiddleware = require("../middlewares/authorize");
const TodosModel = require("../models/todos.model");

const todosRoute = express.Router();

todosRoute.get("/", authorizeMiddleware, async (req, res) => {
  const { user } = req.body;
  try {
    const Data = await TodosModel.find({ user });
    res.status(200).send(Data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

todosRoute.post("/add", authorizeMiddleware, async (req, res) => {
  const payload = req.body;
  try {
    const newTodo = new TodosModel(payload);
    await newTodo.save();
    res.status(200).send({ message: `${payload.title} has been added` });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

todosRoute.patch("/update/:_id", authorizeMiddleware, async (req, res) => {
  const { _id } = req.params;
  const payload = req.body;
  try {
    const Todo = await TodosModel.findOne({ _id });
    if (Todo.user === payload.user) {
      await TodosModel.findByIdAndUpdate({ _id }, payload);
      res.status(200).send({ message: `Todo updated successfully` });
    } else {
      res.status(500).send({ message: "You are not authorized" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

todosRoute.delete("/delete/:_id", authorizeMiddleware, async (req, res) => {
  const { _id } = req.params;
  const payload = req.body;
  try {
    const Todo = await TodosModel.findOne({ _id });
    if (Todo.user === payload.user) {
      await TodosModel.findByIdAndDelete({ _id });
      res.status(200).send({ message: `Todo deleted successfully` });
    } else {
      res.status(500).send({ message: "You are not authorized" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = todosRoute;
