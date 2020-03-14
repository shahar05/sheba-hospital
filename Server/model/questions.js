const mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    text: String,
    createorId: String,
    isDefault: Boolean,
    timestemp: Number,
    questionType: Number,
    min:Number,
    max:Number
});

module.exports = mongoose.model("Question", questionSchema);