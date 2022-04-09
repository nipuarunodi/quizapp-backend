const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Score = mongoose.model("Score");

router.post("/score/create", (req, res) => {
  var { userId, email, name, level, score } = req.body;
  if (!userId || !level || !score) {
    return res.status(200).json({ message: "Add all data", status: false });
  }
  try {
    Score.findOneAndUpdate(
      { userId: userId, level: level },
      { score: score }
    ).then((levelScore) => {
      if (!levelScore) {
        const scoreObj = new Score({
          userId,
          email,
          name,
          level,
          score,
        });
        scoreObj
          .save()
          .then((scoreObj) => {
            res.status(200).json({ message: scoreObj, status: true });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return res.status(200).json({ message: levelScore, status: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/score/user/:userId", (req, res) => {
  userId = req.params.userId;
  Score.findOne({ userId: userId, level: level }).then((levelScore) => {
    if (!levelScore) {
      return res.status(200).json({ message: "Invalid Data", status: false });
    } else {
      return res.status(200).json({ message: levelScore, status: true });
    }
  });
});

router.get("/score", (req, res) => {
    Score.find({ }).then((scores) => {
      if (!scores) {
        return res.status(200).json({ message: "Invalid Data", status: false });
      } else {
        return res.status(200).json({ message: scores, status: true });
      }
    });
  });

module.exports = router;
