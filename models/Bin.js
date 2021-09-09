const mongoose = require("mongoose");

const BinSchema = new mongoose.Schema({
    AccountID:String,
    DeleteDate:Date,
    ID:mongoose.Schema.Types.ObjectId,
    Type:String
});

var Bin = mongoose.model("Bin", BinSchema, "Bin");

module.exports = Bin