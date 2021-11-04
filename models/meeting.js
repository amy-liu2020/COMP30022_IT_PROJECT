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
    Frequency:{
        type:String,
        enum:["Every Day","Every Week", "Every Month","Every Year","Never"],
        default:"Never"
    },
    URL:String,
    NotesKeyWords:[String],
    Notes:{
        type:String,
        default:"Nothing special about this meeting."
    },
    IsActive:{
        type:Boolean,
        default:true
    },
    Tags:[{
        _id:false,
        TagName:String,
        TagId:mongoose.Schema.Types.ObjectId
    }],
    Invitees:[{
        _id:false,
        InviteeName:String,
        InviteeId:mongoose.Schema.Types.ObjectId
    }],
    OtherInvitees:String,
    Attachment:{
        Name: String,
        Data: Buffer
    }
}, {versionKey:false});

const Meeting = mongoose.model("Meeting", MeetingSchema, "MeetingList");


module.exports = Meeting
