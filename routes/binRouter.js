const express = require("express");
const {ensureAuthorized} = require("../utils/token.js");

const binRouter = express.Router();
var binController = require("../controller/contactController");

//present list of bin
binRouter.get("/", ensureAuthorized, (req,res) => {
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