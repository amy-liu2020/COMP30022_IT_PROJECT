const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    AccountID:String,
    Password:String,
    DateOfRegister:Date
});

var User = mongoose.model("User", UserSchema, "UserAccount");

// Test of printing out all user

module.exports = User
