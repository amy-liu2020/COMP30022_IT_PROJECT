const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    AccountID:String,
    TagName:String,
    TagOf:String
});

var Tag = mongoose.model("Tag", TagSchema, "TagList");

module.exports = Tag