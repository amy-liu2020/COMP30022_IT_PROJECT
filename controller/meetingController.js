const Meeting = require("../models/meeting");
const getFullMeeting = async (req, res) => {
    try {
        let uid = req.token.userId
        const meetings = await Meeting.find({AccountID:uid}).lean();
        res.json({
            status:200,
            msg:"Get full meetings successfully",
            meetings
        });
    } catch (err){
        res.json({
            status: 503,
            msg: "get meetings list fail: " + err
        });
    }
};


const getSingleMeeting = async(req, res) =>{
    try {
        let cid = req.params.id
        const meeting = await Meeting.findById(cid).lean();
        res.json({
            status:200,
            msg:"Get single meeting successfully",
            meeting:meeting
        });
    } catch (err){
        res.json({
            status: 400,
            msg: "get single meeting fail" + err
        });
    }
};

const meetingCreate = async (req, res)=>{
    let {
        Title,
        Location,
        StartTime,
        EndTime,
        OtherParticipants,
        Notes,
        Participants,
        Tags
    } = req.body

    let uid = req.token.userId

    const meeting = new Meeting({
        AccountID:uid,
        Title:Title,
        Location:Location,
        StartTime:StartTime,
        EndTime:EndTime,
        OtherParticipants:OtherParticipants,
        IsActive:true,
        Notes:Notes,
        Participants:Participants,
        Tags:Tags
    });

    meeting.save((err)=>{
        if (err){
            res.json({
                status: 503,
                msg: "create meeting fail: " + err
            });
        }
        else {
            res.json({
                status: 200,
                msg: "create success"
            });
        }
    });
};

const meetingEdit = async(req, res) =>{
    res.send("meetingEdit")
    console.log("meetingEdit")
};

const searching = async(req, res) =>{
    res.send("searching")
    console.log("searching")
};

const getDeletedItems = async(req, res) =>{
    res.send("getDeletedItems")
    console.log("getDeletedItems")
};
module.exports = {getFullMeeting, getSingleMeeting,meetingCreate,meetingEdit,searching,getDeletedItems}