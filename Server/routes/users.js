
var JWTTester = require('../middlewares/jwtTester')
var User = require("../model/user");
var express = require("express");
var router = express.Router();
var Question = require("../model/questions");
var PatientRecords = require("../model/answers");

router.get("/name/:phoneNumber" , function(req,res){
    User.findOne({phoneNumber: req.params.phoneNumber} , function(err , user){
        if(err || !user){
            console.log(err);
            res.send("Not Found");
        }else{

            var date = new Date();
            var day  = date.getDate();
            var mounth =  date.getMonth();
            var year = date.getFullYear();


                console.log(day + "   " + mounth + "  " + year);
                

            PatientRecords.find({patientPhoneNumber :req.params.phoneNumber , year:year , mounth:mounth + 1, day:day } , 
               function(err , patientRecord){

                        if (err) {
                            res.send("false");
                        } else {
                            
                            console.log(patientRecord);
                            
                            if (patientRecord.length > 0) {
                                console.log("Have Records");
                                
                                res.send("false");
                            } else {
                                console.log("dosent Have Records");
                                var jsonSend = { name :user.firstName +" "+ user.lastName , startHour : user.startHour , endHour:user.endHour };
                                res.send(jsonSend); 
                            }
                            
                        }
               } )
               
        }
    });
});
router.get("/record/:phoneNumber" , function(req,res){

    console.log(req.params.phoneNumber);   
    PatientRecords.find({patientPhoneNumber:req.params.phoneNumber} , function(err,arrAns){
        if(err  || !arrAns || arrAns.length === 0 ){

            console.log("========== devastated ==========");
            
            console.log(err);
            res.send(false);
        }else{

            console.log("else");

                var isFoundId = false;
            var arr = [ {id: arrAns[0].answerArr[0].questionId , sum:arrAns[0].answerArr[0].answer , counter:1}   ]

            for(let i = 1 ; i < arrAns[0].answerArr.length ; i++){
                let object = { id:arrAns[0].answerArr[i].questionId , sum:arrAns[0].answerArr[i].answer , counter:1}
                arr.push(object);
            }


            for(let i = 1 ; i < arrAns.length ; i++){
               
                for(let j = 0 ; j < arrAns[i].answerArr.length ; j++){
                    isFoundId = false;
                    for(let k = 0 ; k < arr.length ; k++){
                        
                        if(arr[k].id === (arrAns[i].answerArr[j].questionId)  ){
                            arr[j].sum += arrAns[i].answerArr[j].answer;
                            arr[j].counter++; 
                            isFoundId = true;    
                            
                         //   console.log("first id "+arr[k].id + "second id:" + arrAns[i].answerArr[j].questionId );
                            
                       }

                    }
                    if(!isFoundId ){
                        console.log(" hi!!!!!");
                        
                        let ob = { id:arrAns[i].answerArr[j].questionId , sum:arrAns[i].answerArr[j].answer , counter:1};
                         arr.push(ob);
                    }
                }            
            }
                  
            var result = [];
            for(let i = 0 ; i < arr.length ; i++){
                result.push( (arr[i].sum / arr[i].counter));
            }
         
            //console.log(arr);
            var arrQuestions = [];
            for(let i = 0 ; i < arr.length ; i++){
                 arrQuestions.push(arr[i].id);   
            }

            
            

            Question.find(  {_id:arrQuestions} , function(err , questionsArr){
                if (err || !questionsArr) {
                    console.log("err");
                    
                } else {
                   // console.log(questionsArr);
                    
                    var newResult = [];
                    for (let index = 0; index < questionsArr.length; index++) {
                        const element = questionsArr[index];
                        newResult.push( { avg: result[index] , text:element.text }  ) ;
                    }

                    res.send(newResult);

                }
            })    
            
        }
    })

});


router.get("/patient/:phoneNumber" , function (req , res) {
    User.findOne({phoneNumber: req.params.phoneNumber}).populate('questions').exec(function(err,patient){

        if (err) {
            console.log("hello");
            
        } else {
            if (!patient) {
                console.log( "no patient" + req.params.phoneNumber);
                res.send(false);      
            } else {
                console.log( "Requested Phone Number is:" +req.params.phoneNumber );
                let JsonQuestion = {QuestionArray:patient.questions };
                res.send(JsonQuestion);
            }
        }   
    })
})



router.post("/patient/:phoneNumber" , function(req,res){
    var date = new Date();
    console.log(date.getFullYear());
    console.log("========");
    console.log(date.getMonth());

    console.log("Got Post Request");
    


    let newAns = {
        patientPhoneNumber: req.params.phoneNumber,
        answerArr: req.body.arr, 
        timeStemp: Date.now(),
        year: date.getFullYear(),
        day: date.getDate(),
        mounth:(date.getMonth() + 1)
    }

     PatientRecords.create(newAns , function(err , newPatientRec){
         if(err){
             console.log(err);
         }else{
             console.log(newPatientRec);
             res.send({msg: "ok"});
         }
     })

})
// Serach Route
router.post("/find", JWTTester, function (req, res) {

    var string = "foo",
    substring = "oo";
console.log("just check");
console.log(string.includes(substring));
    let me = req.body.phoneNumber;
    var goodArray = [];
    User.find({creatorId: req.user["_id"]} , function(err,allUsers){
        if (err || !allUsers) {
            console.log(err);
        } else {
            allUsers.forEach(myUser => {
                if (myUser.phoneNumber.includes(me) ) {
                    goodArray.push(myUser);
                } 
            });
            return res.send(goodArray);
        }
    })
})

//get All usres
router.get("/users", JWTTester, function (req, res) {
  
    User.find({ creatorId: req.user["_id"] }, function (err, arrUsers) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send({arrUsers: arrUsers , username : req.user.username});
            return;
        }
    });
});

// new  Metopal
router.post("/users", JWTTester, function (req, res) {
    let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        creatorId: req.user._id,
        startHour: req.body.startHour,
        endHour: req.body.endHour
    }
    User.findOne({phoneNumber: req.body.phoneNumber},function(err,sameUser){
            if (err) {
                console.log(err);
                
            } else {
                if (!sameUser) {
                    User.create(newUser, function (err, user) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            Question.find({isDefault:true}, function (err, defQuest) {
                                if (err) { console.log(err); }
                                else {
                                    for (var i = 0; i < defQuest.length; i++) {
                                        user.questions.push(defQuest[i]);
                                    }
                                    user.save();
                                    return res.send(true);
                                }
                            });
                         
                        }
                    });
                } else {
                    return res.send(false);
                }
            }
    }) 
});

// Show All information about user
router.get("/users/:id", JWTTester, function (req, res) {

    User.findById(req.params.id).populate("questions").exec(function (err, foundUser) {
        if (err || !foundUser) {
            console.log("its an error my friend!");
        } else {
            res.send(foundUser);

        }
    });

});

// give all datails about user for edit
router.get("/users/:id/edit", JWTTester, function (req, res) {

    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send(user);
            return;
        }
    });
});

//update the user details
router.put("/users/:id", JWTTester, function (req, res) {

    console.log(req.body);
    
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, updeteUser) {
        if (err) {
            console.log(err);
            console.log("this is err");
            res.send(false);
        } else {
            res.send(true);
            return;
        }
    }); 
});
//Destroy route
router.delete("/users/:id", JWTTester, function (req, res) {
    console.log("Deleting The Metopal!");
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {

            return res.send(true);
        }
    })
});


module.exports = router;


 


     
                //    if (err || !patientRecord || patientRecord.length === 0) {
                //     var jsonSend = { name :user.firstName +" "+ user.lastName , startHour : user.startHour , endHour:user.endHour };
                //         res.send(jsonSend);    
                //        if(err){
                //            console.log(err);
                //            console.log("there is error");
                                                  
                //        }
                        
                //        console.log("No exist Record for today");                                             
                //    } else {
                //        console.log(patientRecord);
                       
                //     res.send(false);                
                //    }