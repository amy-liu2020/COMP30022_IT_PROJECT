const mongoose = require("mongoose")

const securityQuestionSchema = new mongoose.Schema({
    Code:{
        type:Number,
        unique:true,
        required:true
    },
    Question:{
        type:String,
        unique:true,
        required:true
    }
}, {versionKey:false});

const SecurityQuestion = mongoose.model("SecurityQuestion", securityQuestionSchema, "SecurityQuestionList");

module.exports = SecurityQuestion