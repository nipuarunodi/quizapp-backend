const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Question = mongoose.model("Question");

router.post("/questions/create", (req, res) => {
  var { question, choice1, choice2, choice3, choice4, answer, level } =
    req.body;
  console.log(req.body);
  if (
    !question ||
    !choice1 ||
    !choice2 ||
    !choice3 ||
    !choice4 ||
    !answer ||
    !level
  ) {
    return res.status(200).json({ error: "Add all data" });
  }
  try {
    const questionObj = new Question({
      question,
      choice1,
      choice2,
      choice3,
      choice4,
      answer,
      level,
    });
    questionObj
      .save()
      .then((questionObj) => {
        res.json({ message: "Saved Successfully" });
        console.log(questionObj.question);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

// router.get("/questions/:levelId", function (req, res) {
//   levelId = req.params.levelId;
//   try {
//     Question.find({ level: levelId }, function (err, questions) {
//       var questionMap = {};

//       questions.forEach(function (question) {
//         questionMap[question._id] = question;
//       });

//       res.send(questions);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/questions/:levelId", function (req, res) {
  levelId = req.params.levelId;

  switch (levelId) {
    case "1":
      URL = "https://opentdb.com/api.php?amount=10&category=19&difficulty=easy";
      break;
    case "2":
      URL =
        "https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple";
      break;
    case "3":
      URL =
        "https://opentdb.com/api.php?amount=15&category=19&difficulty=medium";
      break;
    case "4":
      URL =
        "https://opentdb.com/api.php?amount=10&category=19&difficulty=hard&type=multiple";
      break;
    case "5":
      URL = "https://opentdb.com/api.php?amount=15&category=19&difficulty=hard";
      break;
    default:
      URL =
        "https://opentdb.com/api.php?amount=10&category=19&difficulty=easy&type=multiple";
      break;
  }

  // try {
  //   Question.find({ level: levelId }, function (err, questions) {
  //     var questionMap = {};

  //     questions.forEach(function (question) {
  //       questionMap[question._id] = question;
  //     });

  //     res.send(questions);
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
});

module.exports = router;
