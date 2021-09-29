const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    //userID: used in login
    UserID:String,
    Password:String,
    DateOfRegister:Date,
    //just a name
    UserName:String,
    SecurityQuestion: Number,
    SecurityAnswer: String,
    Photo: Buffer,
    Email: String,
    PhoneNumber: String
}, {versionKey:false});

var User = mongoose.model("User", UserSchema, "UserAccount");

// Test of printing out all user

module.exports = User
