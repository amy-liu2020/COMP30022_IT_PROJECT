const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    UserID:String,
    Password:String,
    DateOfRegister:Date,
    UserName:String,
    SecurityQuestion: Number,
    SecurityAnswer: String,
    Photo: Buffer
}, {versionKey:false});

var User = mongoose.model("User", UserSchema, "UserAccount");

// Test of printing out all user

module.exports = User
