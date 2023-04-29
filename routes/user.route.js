const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersModel = require("../models/user.model");

const userRoute = express.Router();

userRoute.post("/login", async (req, res) => {
  const payload = req.body;
  try {
    const User = await UsersModel.findOne({ email: payload.email });
    bcrypt.compare(payload.password, User.password, function (err, result) {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(200).send({
          message: "Login successful",
          token: jwt.sign(
            {
              user: User._id,
            },
            "full-stack-todos",
            { expiresIn: "1h" }
          ),
        });
      }
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRoute.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const User = await UsersModel.findOne({ email: payload.email });
    if (User) {
      res.status(200).send({ message: `${payload.email} already exists` });
    } else {
      bcrypt.hash(payload.password, 2, async function (err, hash) {
        if (err) {
          res.status(400).send({ message: err.message });
        } else {
          const newUser = new UsersModel({ ...payload, password: hash });
          await newUser.save();
          res
            .status(200)
            .send({ message: `${payload.email} registered successfully` });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = userRoute;
