const mongoose = require("mongoose");
var DoctorSchema = new mongoose.Schema({
    username: String,
    password: String
    
});
module.exports = mongoose.model("Doctor", DoctorSchema);