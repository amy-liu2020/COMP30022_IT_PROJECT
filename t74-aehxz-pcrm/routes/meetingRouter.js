const express = require("express");

const meetingRouter = express.Router();
var meetingRouter = require("../controller/meetingController");

// get the meeting list page
meetingRouter.get("/contacts", (req,res) =>
    meetingRouter.getFullContact(req,res)
);

// get a single meeting page
meetingRouter.get("/contacts/:id", (req,res) =>
    meetingRouter.getSingleContact(req,res)
);

// create single meeting
meetingRouter.post("/contacts/create", meetingRouter.contactCreate);

// edit single meeting
meetingRouter.post("/contacts/create", meetingRouter.contactEdit);

//export the router
module.exports = meetingRouter;