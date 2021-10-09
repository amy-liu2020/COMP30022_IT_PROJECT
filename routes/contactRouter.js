const express = require("express");
const {ensureAuthorized} = require("../utils/token.js");

const contactRouter = express.Router();
var contactController = require("../controller/contactController");

// get the main contact page
contactRouter.get("/", ensureAuthorized, (req,res) => {
    contactController.getFullContact(req,res)
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

// delete single Contact
contactRouter.post("/delete/:id", ensureAuthorized, (req,res)=>{
    contactController.contactDelete(req,res)
})

// present the searching results 
contactRouter.get("/fuzzySearch/:keyword", (req,res) => {
    contactController.fuzzySearch(req,res)
});

// present the bin page
contactRouter.get("/bin", (req,res) => {
    contactController.getDeletedItems(req,res)
});

//export the router
module.exports = contactRouter;