const mongoose = require("mongoose")

const SessionSchema = new mongoose.Schema({
    _id: String,
    expires:Date,
    session:String
});

var Session = mongoose.model("Session", SessionSchema, "sessions");



module.exports = Session