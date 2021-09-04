const express = require("express");

const contactRouter = express.Router();
var contactController = require("../controller/contactController");

// get the main contact page
contactRouter.get("/", (req,res) =>
    contactRouter.getFullContact(req,res)
);

// get a single contact
contactRouter.get("/:id", (req,res) =>
    contactRouter.getSingleContact(req,res)
);

// create single Contact
contactRouter.post("/create", contactController.contactCreate);

// edit single Contact
contactRouter.post("/edit", contactController.contactEdit);

// present the searching results 
contactRouter.get("/searching/:type/:searchingawords", (req,res) =>
    contactController.searching(req,res)
);

// present the bin page
contactRouter.get("/bin", (req,res) =>
    contactController.getDeletedItems(req,res)
);

//export the router
module.exports = contactRouter;