const mongoose = require("mongoose");

const BinSchema = new mongoose.Schema({
    AccountID:{
        type:String,
        required:true
    },
    DeleteDate:{
        type:Date,
        required:true
    },
    ID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        enum:["C","M"],
        required:true
    }
}, {versionKey:false});

var Bin = mongoose.model("Bin", BinSchema, "Bin");

module.exports = Bin
