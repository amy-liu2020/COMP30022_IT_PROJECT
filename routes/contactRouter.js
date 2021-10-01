const express = require("express");

const contactRouter = express.Router();
var contactController = require("../controller/contactController");

// get the main contact page
contactRouter.get("/", (req,res) => {
    contactController.getFullContact(req,res)
});

// get a single contact
contactRouter.get("/:id", (req,res) => {
    contactController.getSingleContact(req,res)
});

// create single Contact
contactRouter.post("/create", (req,res) => 
    contactController.contactCreate(req,res)
);

// edit single Contact
contactRouter.post("/edit/:id", (req,res) => 
contactController.contactEdit(req,res)
);

// present the searching results 

contactRouter.get("/searching/:type/:searchingawords", (req,res) => {
    contactController.searching(req,res)
});

// present the bin page
contactRouter.get("/bin", (req,res) => {
    contactController.getDeletedItems(req,res)
});

//export the router
module.exports = contactRouter;