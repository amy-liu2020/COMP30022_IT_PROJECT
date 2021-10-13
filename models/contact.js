const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    AccountID:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    MobileNo:String,
    HomeNo:String,
    Email:String,
    Company:String,
    JobTitle:String,
    DOB:Date,
    Relationship:String,
    Address:String,
    Notes:{
        type:String,
        default:"Nothing special about this contact."
    },
    IsActive:{
        type:Boolean,
        default:true
    },
    Tags:[{
        _id:false,
        TagName:String,
        TagId:mongoose.Schema.Types.ObjectId
    }]
}, {versionKey:false});

const Contact = mongoose.model("Contact", ContactSchema, "ContactList");

module.exports = Contact