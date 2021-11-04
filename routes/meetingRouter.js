const express = require("express");
const {ensureAuthorized} = require("../utils/token.js");

const meetingRouter = express.Router();
var meetingController = require("../controller/meetingController");
const {uploadFile, deleteMiddlePath} = require('../utils/multer.js')

// get the meeting list page
meetingRouter.get("/", ensureAuthorized, (req, res) => {
    meetingController.getFullMeeting(req, res)
});

// get the meeting list with given tag
meetingRouter.get("/getByTag/:tag", ensureAuthorized, (req, res) => {
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
meetingRouter.delete("/delete/:id", ensureAuthorized, (req,res) => 
    meetingController.meetingDelete(req,res)
);

// present the searching results 
meetingRouter.get("/fuzzySearch/:keyword",ensureAuthorized, (req,res) =>
    meetingController.fuzzySearch(req,res)
);

// upload attachment to meeting
meetingRouter.post("/upload/:id", uploadFile, ensureAuthorized, (req, res) => {
    meetingController.uploadAttachment(req, res, deleteMiddlePath)
});

// assign tag to this contact
meetingRouter.post("/addTag/:id", ensureAuthorized, (req,res) => {
    meetingController.assignTag(req,res)
});

//export the router
module.exports = meetingRouter;