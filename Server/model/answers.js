const mongoose = require("mongoose");

var answerSchema = new mongoose.Schema({
    patientPhoneNumber: String,
    answerArr:[{
        questionId:String,
        questionType: Number,
        answer: Number
    }   
    ],
    
    timeStemp: Number,
    year:Number,
    mounth:Number,
    day:Number
    

});

module.exports = mongoose.model("PatientRecords", answerSchema);             

// patientId:String,