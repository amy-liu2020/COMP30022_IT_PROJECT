const MAX_ATTEMPT_TIME = 5;

const { text } = require("body-parser");
const bodyParser = require("body-parser");

var User = require("../models/User")
var server = require("../server")

exports.userLogin = function (req, res) {
    if(req.cookies.AttemptTimes == undefined){
        res.cookie("AttemptTimes", 0, { maxAge: 1000 * 60 * 30, overwrite: true })
    }
    res.render("login", {});
};

exports.doLogin = function (req, res) {
    let AT = req.cookies.AttemptTimes;
    AT++;
    res.cookie("AttemptTimes", AT, { maxAge: 1000 * 60 * 30, overwrite: true })
    if(AT > MAX_ATTEMPT_TIME){
        res.send("you can't login anymore, wait 30 minutes");
    }
    res.cookie("AttemptTimes", AT, { maxAge: 1000 * 60 * 30, overwrite: true })

    var body = req.body;
    User.find({ AccountID: body.username }, function (err, doc) {
        let result = {};
        if (err) {
            result = {
                id: err,
                text: "database error",
                code: "E"
            }
        } else {
            if (!doc.length) {
                result = {
                    id: doc,
                    text: "Username does not exist",
                    code: "E"
                }
            } else if (body.password == doc[0].Password) {
                result = {
                    id: doc[0]._id,
                    text: "login successful",
                    code: "S"
                }
            } else if (body.password != doc[0].Password) {
                result = {
                    id: doc[0]._id,
                    text: "password incorrect",
                    code: "E"
                }
            }
        }

        console.log(result.text);
        if (result.code == "E") {
            res.redirect("/");
        } else if (result.code = "S") {
            res.cookie("AttemptTimes", 0, { maxAge: 1000 , overwrite: true })
            req.session.userid = result.id;
            req.session.loginState = 0;
            res.redirect("/conflict");
        }

    })
    
};


exports.userRegister = function (req, res) {
    res.send("Register")
    console.log("Register")
};
exports.getProfile = function (req, res) {
    res.send("Profile")
    console.log("Profile")
};
exports.changePassword = function (req, res) {
    res.send("Password")
    console.log("Password")
};
exports.changeDetails = function (req, res) {
    res.send("Details")
    console.log("Details")
};

exports.conflictLogin = async function (req, res) {
    if(await server.conflictLoginCheck(req, res)){
        console.log("you take someone")
    }
    console.log("still you")
    res.redirect("/contact/");
}