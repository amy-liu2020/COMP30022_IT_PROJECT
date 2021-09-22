const Meeting = require("../models/meeting");
const getFullMeeting = async (req, res) => {
    try {
        const meetings = await Meeting.find().lean();
        res.json(meetings);
    } catch (err){
        console.log(err);
    }
};


const getSingleMeeting = async(req, res) =>{
    try {
        const meeting = await Meeting.findOne(
            {_id: req.params.id} 
        ).lean();
        res.json(meeting);
    } catch (err){
        console.log(err)
    }
};
const meetingCreate = async (req, res)=>{
    res.send("meetingCreate")
    console.log("meetingCreate")
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