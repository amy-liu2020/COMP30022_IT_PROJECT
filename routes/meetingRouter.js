const express = require("express");
const {ensureAuthorized} = require("../utils/token.js");

const meetingRouter = express.Router();
var meetingController = require("../controller/meetingController");

// get the meeting list page
meetingRouter.get("/", ensureAuthorized, (req, res) => {
    meetingController.getFullMeeting(req, res)
});

// get the meeting list with given tag
meetingRouter.get("/:tag", ensureAuthorized, (req, res) => {
    meetingController.getMeetingsByTag(req, res)
});

// get a single meeting page
meetingRouter.get("/:id", (req,res) => {
    meetingController.getSingleMeeting(req,res)
});

// create single meeting
meetingRouter.post("/create", ensureAuthorized, (req,res) => 
    meetingController.meetingCreate(req,res)
);

// edit single meeting
meetingRouter.post("/edit/:id", (req,res) => 
    meetingController.meetingEdit(req,res)
);

// delete single meeting
meetingRouter.post("/delete/:id", ensureAuthorized, (req,res) => 
    meetingController.meetingDelete(req,res)
);
// present the searching results 
meetingRouter.get("/fuzzySearch/:keyword", (req,res) =>
    meetingController.fuzzySearch(req,res)
);

// present the bin page
meetingRouter.get("/bin", (req,res) => {
    meetingController.getDeletedItems(req,res)
});

//export the router
module.exports = meetingRouter;