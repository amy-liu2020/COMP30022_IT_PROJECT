const Bin = require("../models/bin");
const Meeting = require("../models/meeting");
const getFullMeeting = async (req, res) => {
    try {
        let uid = req.token.userId
        const meetings = await Meeting.find({AccountID:uid, IsActive:true},"Title StartTime Location Invitees", (err) => {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }).lean();
        res.status(200).json({
            msg: "Get meeting list successfully",
            meetings:meetings
        })
    } catch (err){
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};

const getMeetingsByTag = async (req, res) => {
    try {
        let uid = req.token.userId
        let tag = req.params.tag
        const meetings = await Meeting.find({AccountID:uid, Tags:{$elemMatch:{$eq:tag}}, IsActive:true},"Title StartTime Location Invitees", (err) => {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }).lean();
        res.status(200).json({
            msg: "Get meeting list with tag "+tag+" successfully",
            meetings:meetings
        })
    } catch (err){
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};


const getSingleMeeting = async(req, res) =>{
    try {
        let mid = req.params.id
        const meeting = await Meeting.findById(mid, (err) => {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }).lean();
        res.status(200).json({
            msg: "Get single meeting successfully",
            meeting:meeting
        })
    } catch (err){
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};


const meetingCreate = async (req, res)=>{
    let {
        Title,
        URL,
        Frequency,
        Location,
        StartTime,
        EndTime,
        OtherInvitees,
        Notes,
        NotesKeyWords,
        Attachment,
        Invitees,
        Tags
    } = req.body

    let uid = req.token.userId

    const meeting = new Meeting({
        AccountID:uid,
        Title:Title,
        URL:URL,
        Frequency:Frequency,
        Location:Location,
        StartTime:StartTime,
        EndTime:EndTime,
        OtherInvitees:OtherInvitees,
        IsActive:true,
        Notes:Notes,
        NotesKeyWords:NotesKeyWords,
        Invitees:Invitees,
        Attachment:Attachment,
        Tags:Tags
    });

    meeting.save((err)=>{
        if (err){
            res.status(400).json({
                msg: "Error occurred: " + err
            })
        }
        else {
            res.status(200).json({
                msg: "Create a new meeting successfully"
            })
        }
    });
};

const meetingEdit = async(req, res) =>{
    try{
        let {
            Title,
            URL,
            Frequency,
            Location,
            StartTime,
            EndTime,
            OtherInvitees,
            Notes,
            NotesKeyWords,
            Attachment,
            Invitees,
            Tags
        } = req.body
        let MeetingId = req.params.id;
        Meeting.findByIdAndUpdate(MeetingId,{
            Title:Title,
            URL:URL,
            Frequency:Frequency,
            Location:Location,
            StartTime:StartTime,
            EndTime:EndTime,
            OtherInvitees:OtherInvitees,
            Notes:Notes,
            NotesKeyWords:NotesKeyWords,
            Invitees:Invitees,
            Attachment:Attachment,
            Tags:Tags
        }, (err)=>{
            if(err){
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })
        const meeting = await Meeting.findById(MeetingId).lean();
        res.status(200).json({
            msg: "Edit meeting successfully",
            meeting:meeting
        })
        
    
    } catch (err){
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};

const meetingDelete = async (req,res) => {
    let mid = req.params.id
    let uid = req.token
    Contact.findByIdAndUpdate(mid, {IsActive:false}, (err) =>{
        if(err){
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }
    })

    const deletedItem = new Bin({
        AccountID:uid,
        DeleteDate:new Date(),
        ID:mid,
        Type:"M"
    })
    deletedItem.save((err)=>{
        if (err){
            res.status(400).json({
                msg: "Error occurred: " + err
            })
        }
        else {
            res.status(200).json({
                msg: "Delete meeting successfully"
            })
        }
    });
}

const fuzzySearch = async(req, res) =>{
    let keyword = req.params.keyword
    let uid = req.token.userId
    let reg = new RegExp(keyword,"i")
    const searchResult = await Meeting.find({
        $and:[
            {$or:[
                {Title:reg},
                {Location:reg},
                {URL:reg},
                {OtherInvitees:reg},
                {StartTime:reg},
                {Notes:reg}
            ]},
            {IsActive:true, AccountID:uid}
        ]},
        "Title StartTime Location Invitees",
        (err) => {
            if(err){
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        }
    ).lean()
    res.status(200).json({
        msg: "Search contact successfully",
        searchResult:searchResult
    });
};
module.exports = {
    getFullMeeting, 
    getMeetingsByTag, 
    getSingleMeeting,
    meetingCreate,
    meetingEdit,
    meetingDelete,
    fuzzySearch
}