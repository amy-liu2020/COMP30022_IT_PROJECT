const mongoose = require("mongoose")

const MeetingSchema = new mongoose.Schema({
    AccountID:String,
    Title:String,
    Location:String,
    StartTime:Date,
    EndTime:Date,
    OtherParticipants:String,
    IsActive:Boolean,
    Notes:String,
    Participants:[mongoose.Schema.Types.ObjectId],
    Tags:[String]
});

var Meeting = mongoose.model("Meeting", MeetingSchema, "MeetingList");

Meeting.find({},function(err, doc){
    if(err){
        console.log(err);
        return;
    }
    console.log(doc);

});

module.exports = Meeting