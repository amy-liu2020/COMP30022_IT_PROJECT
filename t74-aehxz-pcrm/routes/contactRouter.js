const express = require("express");

const contactRouter = express.Router();
var contactRouter = require("../controller/contactController");

// get the main contact page
contactRouter.get("/contacts", (req,res) =>
    contactRouter.getFullContact(req,res)
);

// get a single contact
contactRouter.get("/contacts/:id", (req,res) =>
    contactRouter.getSingleContact(req,res)
);

// create single Contact
contactRouter.post("/contacts/create", contactRouter.contactCreate);

// edit single Contact
contactRouter.post("/contacts/create", contactRouter.contactEdit);

//export the router
module.exports = contactRouter;