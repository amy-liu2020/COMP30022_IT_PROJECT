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
    //name of user to present in their profile page
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
    //prefered theme colour
    Color: {
        type: String,
        default: "Green"
    }
}, {versionKey:false});

var User = mongoose.model("User", UserSchema, "UserAccount");


module.exports = User
