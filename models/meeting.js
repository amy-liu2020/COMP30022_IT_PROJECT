const mongoose = require("mongoose")

const MeetingSchema = new mongoose.Schema({
    AccountID:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Location:String,
    StartTime:Date,
    EndTime:Date,
    OtherInvitees:String,
    IsActive:{
        type:Boolean,
        default:true
    },
    Notes:{
        type:String,
        default:"Nothing special about this meeting."
    },
    Invitees:[mongoose.Schema.Types.ObjectId],
    Tags:[String]
}, {versionKey:false});

const Meeting = mongoose.model("Meeting", MeetingSchema, "MeetingList");


module.exports = Meeting
