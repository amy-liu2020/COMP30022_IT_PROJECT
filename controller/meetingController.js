exports.getFullMeeting = function (req, res){
    res.send("FullMeeting")
    console.log("FullMeeting")
};

exports.getSingleMeeting = function (req, res){
    res.send("SingleMeeting")
    console.log("SingleMeeting")
};
exports.meetingCreate = function (req, res){
    res.send("meetingCreate")
    console.log("meetingCreate")
};

exports.meetingEdit = function (req, res){
    res.send("meetingEdit")
    console.log("meetingEdit")
};
exports.searching = function (req, res){
    res.send("searching")
    console.log("searching")
};
exports.getDeletedItems = function (req, res){
    res.send("getDeletedItems")
    console.log("getDeletedItems")
};