var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var userRoute = require("./routes/users");
var doctorRoute = require("./routes/doctor");
var getIP = require('ipware')().get_ip;
var questionRoute = require("./routes/questions");
var authenticationRoute = require("./routes/authentications");
const app = express();


mongoose.connect('mongodb://localhost:27017/shiba_app', { useNewUrlParser: true });

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.use(function(req, res, next) {
    // var ipInfo = getIP(req);
    // console.log(ipInfo);
    // console.log(req.ip);
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    console.log(ip);   
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});

// =========== Authentication-routes =========
app.use(authenticationRoute);
// ========== Doctor Routes ==========
app.use(doctorRoute);
// ========== User Routes ==========
app.use(userRoute);
// ========== Question Routes ==========
app.use(questionRoute);

app.get("*", function (req, res) {

    console.log("SomeOne hit the star Route");
    
    res.send("you hit the * route");
});


app.listen(3000 ,function (req, res) {
    console.log("server up!");
    
});

