const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    AccountID:String,
    Password:String,
    DateOfRegister:Date
});

var User = mongoose.model("User", UserSchema, "UserAccount");

module.exports = User