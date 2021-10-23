const express = require("express");
const {ensureAuthorized} = require("../utils/token.js");
const {uploadFile} = require('../utils/multer.js')

const contactRouter = express.Router();
var contactController = require("../controller/contactController");

// get the main contact page
contactRouter.get("/", ensureAuthorized, (req,res) => {
    contactController.getFullContact(req,res)
});

// get the contact list with given tag
contactRouter.get("/getByTag/:tag", ensureAuthorized, (req,res) => {
    contactController.getContactsByTag(req,res)
});

// get a single contact
contactRouter.get("/:id", (req,res) => {
    contactController.getSingleContact(req,res)
});

// create single Contact
contactRouter.post("/create", ensureAuthorized, (req,res) => 
    contactController.contactCreate(req,res)
);

// edit single Contact
contactRouter.post("/edit/:id", (req,res) => 
    contactController.contactEdit(req,res)
);

// get photo of contact
contactRouter.get("/getPhoto/:id", (req,res) => 
    contactController.getPhoto(req,res)
);

// upload photo for a contact
contactRouter.post("/uploadPhoto/:id", uploadFile, (req,res) => 
    contactController.savePhoto(req,res)
);

contactRouter.delete("/delete/:id", ensureAuthorized, (req,res)=>{
    contactController.contactDelete(req,res)
})

// present the searching results 
contactRouter.get("/fuzzySearch/:keyword", ensureAuthorized, (req,res) => {
    contactController.fuzzySearch(req,res)
});

// assign contact to meeting as invitees
contactRouter.post("/addTo/:id", ensureAuthorized, (req,res) => {
    contactController.addToMeeting(req,res)
});

// assign tag to this contact
contactRouter.post("/addTag/:id", ensureAuthorized, (req,res) => {
    contactController.assignTag(req,res)
});

//export the router
module.exports = contactRouter;