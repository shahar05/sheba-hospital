
var btoa = require('btoa');
var express = require("express");
var Doctor = require("../model/doctor");
var Authenticate = require('../AuthenticationHandler/Authentication')
var router = express.Router();

router.post("/register", function (req, res) {

    console.log("hit route");

    var newDoc = new Doctor(
        {
            username: req.body.userName,
            password: btoa(req.body.userPassword)
        }
    );
    Doctor.find({username:req.body.userName} , function(err,theUser){
        if(err){
            res.status(402).send({ err : "Not User Exist" });
            return;
        }else{
            if(theUser.length === 0 ){
              Doctor.create(newDoc, (err, user) => {
                    if (err) {
                        console.log(err);
                        res.status(401).send({ error : err.message });
                        return;
                    }
                    let token = Authenticate.createToken({
                        username: user.username,
                        password: user.password,
                        _id: user._id
                    })
                    res.send(token);
                });
            }else{
                res.status(409).send({ err : "exist User" });
            }
        }
    })
    
  
});




module.exports = router;