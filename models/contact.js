const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    AccountID:{
        type:String,
        required:true
    },
    Company:String,
    Email:String,
    FullName:{
        type:String,
        required:true
    },
    Address:String,
    IsActive:{
        type:Boolean,
        default:true
    },
    JobTitle:String,
    Notes:{
        type:String,
        default:"Nothing special about this contact."
    },
    PhoneNumber:{
        Mobile:String,
        Home:String
    },
    Tags:[String]
}, {versionKey:false});

const Contact = mongoose.model("Contact", ContactSchema, "ContactList");

module.exports = Contact