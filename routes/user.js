const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

router.get("/user/:userId", (req, res) => {
  userId = req.params.userId;

  User.findOne({ _id: userId }).then((savedUser) => {
    if (!savedUser) {
      return res.status(200).json({ message: "Invalid User", status: false });
    } else {
      return res.status(200).json({ message: savedUser, status: true });
    }
  });
});

router.post("/user/login", (req, res) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(200)
      .json({ message: "Please add all fields", status: false });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res
        .status(200)
        .json({ message: "Invalid Email or password", status: false });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, {
            expiresIn: "1h",
          });
          return res.json({ token: token, status: true });
        } else {
          return res
            .status(200)
            .json({ message: "Invalid email or password", status: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/user/signup", (req, res) => {
  var { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(200).json({ message: "Add all data", status: false });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedpw) => {
      User.findOne({ email: email })
        .then((savedUser) => {
          if (savedUser) {
            return res.status(200).json({
              message: "User already exists with that email",
              status: false,
            });
          }
          const user = new User({
            email,
            password: hashedpw,
            name,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "Saved Successfully", status: true });
              console.log(user.email);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
