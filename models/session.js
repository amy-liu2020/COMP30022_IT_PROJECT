const mongoose = require("mongoose")

const SessionSchema = new mongoose.Schema({
    _id: String,
    expires:Date,
    session:String
}, {versionKey:false});

var Session = mongoose.model("Session", SessionSchema, "sessions");



module.exports = Session