const express = require("express");
const {ensureAuthorized} = require("../utils/token.js");
const schedule = require('node-schedule');

const binRouter = express.Router();
var binController = require("../controller/binController");

//present list of bin
binRouter.get("/:type", ensureAuthorized, (req,res) => {
    binController.getBinList(req,res)
});

//get single item of bin
binRouter.get("/get/:id", (req,res) => {
    binController.getBinItem(req,res)
});

//delete item from bin
binRouter.post("/delete/:id", (req,res) => {
    binController.deleteBinItem(req,res)
});

//restore item from bin
binRouter.post("/restore/:id", (req,res) => {
    binController.restoreBinItem(req,res)
});

//clear all items in bin
binRouter.post("/clear",ensureAuthorized, (req,res) => {
    binController.clearAll(req,res)
});

// present the searching results 
binRouter.get("/fuzzySearch/:keyword",ensureAuthorized, (req,res) =>
    binController.fuzzySearch(req,res)
);

let rule = new schedule.RecurrenceRule();
rule.second = 0;
rule.minute = 0;
rule.hour = 0;

let job = schedule.scheduleJob(rule, (req, res) => {
    binController.autoDeleteItems(req, res);
});


module.exports = binRouter;