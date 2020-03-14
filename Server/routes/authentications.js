
var btoa = require('btoa');
var express = require("express");
var Doctor = require("../model/doctor");
var Authenticate = require('../AuthenticationHandler/Authentication')
var router = express.Router();



router.post('/login', function (req, res) {
    let user = {
        username: req.body.username,
        password: btoa(req.body.password)
    }

    Doctor.findOne(
        {
            username: user.username,
            password: user.password
        }, (err, loggedInUser) => {
            if (err || !loggedInUser ) {
                console.log("no user with username or password exist");
                console.log(err);
                res.status(402).send({ err : "Not User Exist" });
                return;
            }
            let token = Authenticate.createToken({
                username: loggedInUser.username,
                password: loggedInUser.password,
                _id: loggedInUser._id
            })
            res.send(token);

        })

});


module.exports = router;