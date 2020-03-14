const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    creatorId: String,
    startHour: Number,
    endHour:Number,
    questions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Question"
        }
    ]
});

module.exports = mongoose.model("User",userSchema);