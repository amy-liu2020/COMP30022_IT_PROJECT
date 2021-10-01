const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    //userID: used in login
    UserID:{
        type:String,
        unique:true,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    DateOfRegister:Date,
    //just a name
    UserName:{
        type:String,
        required:true
    },
    SecurityQuestion:{
        type:Number,
        required:true
    },
    SecurityAnswer: {
        type:String,
        required:true
    },
    Photo: {
        type: Buffer,
        default: ""
    },
    Email: {
        type: String,
        default: ""
    },
    PhoneNumber: {
        type: String,
        default: ""
    },
    Color: {
        type: String,
        default: "Green"
    }
}, {versionKey:false});

var User = mongoose.model("User", UserSchema, "UserAccount");

// Test of printing out all user

module.exports = User
