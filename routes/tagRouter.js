const express = require("express");
const {ensureAuthorized} = require("../utils/token.js");

const tagRouter = express.Router();
var tagController = require("../controller/tagController");

// add a new tag into tag list
tagRouter.post("/addTag", ensureAuthorized, (req, res) => {
    tagController.addTag(req, res)
})

// delete an existing tag from tag list
tagRouter.post("/deleteTag", ensureAuthorized, (req, res) => {
    tagController.deleteTag(req, res)
})

// get a list of tags
tagRouter.get("/getTagList/:tagOf", ensureAuthorized, (req, res) => {
    tagController.getTagList(req, res)
})

module.exports = tagRouter;