const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    AccountID:String,
    Company:String,
    Email:String,
    FullName:String,
    Home:String,
    IsActive:Boolean,
    JobTitle:String,
    Notes:String,
    PhoneNumber:String,
    Tags:[String]
});

var Contact = mongoose.model("Contact", ContactSchema, "ContactList");

module.exports = Contact