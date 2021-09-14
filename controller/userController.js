const bodyParser = require("body-parser");

var User = require("../models/User")

exports.userLogin = function (req, res) {
    res.render("login", {});
};
exports.doLogin = function (req, res) {
    var body = req.body;
    User.find({ AccountID: body.username }, function (err, doc) {
        let result = {};
        if (err) {
            result = {
                res: err,
                text: "database error",
                code: "E"
            }
        } else {
            if (!doc.length) {
                result = {
                    res: doc,
                    text: "Username does not exist",
                    code: "E"
                }
            } else if (body.password == doc[0].Password) {
                result = {
                    res: doc,
                    text: "login successful",
                    code: "S"
                }
            } else if (password != doc[0].Password) {
                result = {
                    res: doc,
                    text: "password incorrect",
                    code: "E"
                }
            }
        }

        console.log(result.text);
        if (result.code == "E") {
            res.render("login", {});
        } else if (result.code = "S") {
            res.redirect("/contact/");
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