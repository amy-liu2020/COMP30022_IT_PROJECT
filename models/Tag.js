const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    AccountID:String,
    TagName:String,
    TagOf:String
}, {versionKey:false});

var Tag = mongoose.model("Tag", TagSchema, "TagList");

module.exports = Tag