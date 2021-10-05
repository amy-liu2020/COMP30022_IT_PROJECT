const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    AccountID:{
        type:String,
        required:true
    },
    TagName:{
        type:String,
        required:true
    },
    TagOf:{
        type:String,
        enum:["C","M"],
        required:true
    }
}, {versionKey:false});

var Tag = mongoose.model("Tag", TagSchema, "TagList");

module.exports = Tag
