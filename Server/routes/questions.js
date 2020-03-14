var Question = require("../model/questions");
var JWTTester = require('../middlewares/jwtTester')
var express = require("express");
var User = require("../model/user");
//var DefualtQuestion = require("../model/defualtQuestion");
var router = express.Router();


// add new question to the user array of questions
router.post("/users/:id/questions", JWTTester, function (req, res) {
   

    console.log("new Question");

    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err); return;
        } else {
            Question.create(req.body , function (err, question) {
                if (err) {
                    console.log(err);
                } else {
                    question.save();
                    user.questions.push(question);
                    user.save();

                    return res.send(true);
                }
            });
        }
    });

});

//Find All Default questions
router.get("/default", JWTTester, function (req, res) {

    Question.find({ isDefault: true }, function (err, ArrayOfdefQuest) {
        if (err) {
            console.log(err);
        } else {
            res.send(ArrayOfdefQuest);
            return
        }
    })
});



//cerate new default question
router.post("/default", JWTTester, function (req, res) {

    console.log("===============");
    console.log(req.body);
    console.log("===============");

    if (req.body.min && req.body.max) {
        var Min = req.body.min;
        var Max = req.body.max;
    }

    Question.create({ text: req.body.question, isDefault: true, questionType: req.body.typeNumber, min: Min, max: Max }, function (err, newQuest) {
        if (err) {
            console.log(err);
        } else {
            if (req.body.forAll === "false") {
                console.log("always goes here");
                return res.send(true);
            } else {
                console.log("add new default question to all users!");
                User.find({}, function (err, allUsers) {
                    if (err) {
                        console.log(err);
                    } else {
                        for (let i = 0; i < allUsers.length; i++) {
                            allUsers[i].questions.push(newQuest);
                            allUsers[i].save();
                        }
                        return res.send(true);
                    }
                })
            }
        }
    });
});

// Get data about the question for edit
router.get("/default/:default_id", JWTTester, function (req, res) {
    Question.findById(req.params.default_id, function (err, foundedQuest) {
        if (err) {
            console.log(err);
        } else {
            return res.send(foundedQuest);
        }
    });
});

// Update The question
router.post("/default/:default_id", JWTTester, function (req, res) {

   
    var theUpdateQuestion = { text: req.body.question, questionType: req.body.typeNumber  };
    if (req.body.min && req.body.max) {
        theUpdateQuestion.min = req.body.min;
        theUpdateQuestion.max = req.body.max;
    }
    Question.findByIdAndUpdate(req.params.default_id, theUpdateQuestion, function (err, updatedQuest) {
        if (err) {
            console.log(err);

        } else {
            return res.send(true);
        }
    })

});



//  moving question from the Default Question to the UnDefault Question
router.delete("/default/:default_id", JWTTester, function (req, res) {

    Question.findByIdAndUpdate(req.params.default_id, { isDefault: false }, function (err, updatedQuest) {
        if (err) {
            console.log(err);
        } else {
            console.log("updeate to no default");
            return res.send(true);
        }
    })
});

router.put("/users/:id/questions", JWTTester, function (req, res) {
    console.log("hit the Update route");

})



// remove the question from the current array of user
router.delete("/users/:id/questions", JWTTester, function (req, res) {

    var index = req.body.number;
    var idMatch = req.body.matchId;
    
    User.findById(req.params.id).populate("questions").exec(function (err, foundUser) {
        if (err || !foundUser) {
            console.log("its an error my friend!");
        } else {
            console.log("========= Question =========");
            console.log(foundUser.questions[index]);

            var array = foundUser.questions;
            for (let i = 0; i < array.length; i++) {
                const quest = array[i];
                if (quest._id.equals(idMatch)) {
                    foundUser.questions.splice(i, 1);
                    foundUser.save();
                    res.send(true);
                    return;
                }
            }
        }
    });


})

module.exports = router;

