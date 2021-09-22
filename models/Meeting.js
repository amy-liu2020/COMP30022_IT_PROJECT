const mongoose = require("mongoose")

const MeetingSchema = new mongoose.Schema({
    AccountID:String,
    Title:String,
    Location:String,
    StartTime:Date,
    EndTime:Date,
    OtherInvitees:String,
    IsActive:Boolean,
    Notes:String,
    Invitees:[mongoose.Schema.Types.ObjectId],
    Tags:[String]
}, {versionKey:false});

const Meeting = mongoose.model("Meeting", MeetingSchema, "MeetingList");


module.exports = Meeting