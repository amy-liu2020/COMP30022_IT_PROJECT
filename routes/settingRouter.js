const express = require("express");

const settingRouter = express.Router();
var settingRouter = require("../controller/settingController");

// get the setting page
settingRouter.get("/", (req,res) => {
    settingController.getSetting(req,res)
});

//export the router
module.exports = settingRouter;