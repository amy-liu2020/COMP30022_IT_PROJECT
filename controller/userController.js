const MAX_ATTEMPT_TIME = 5;

const { text } = require("body-parser");
const bodyParser = require("body-parser");

var User = require("../models/User")
var server = require("../server")

exports.userLogin = function (req, res) {
    res.render("login", {});
};

exports.doLogin = function (req, res) {
    if (req.cookies.AttemptTimes == undefined) {
        res.cookie("AttemptTimes", 0, { maxAge: 1000 * 60 * 30, overwrite: true })
    }
    let AT = req.cookies.AttemptTimes;
    AT++;
    res.cookie("AttemptTimes", AT, { maxAge: 1000 * 60 * 30, overwrite: true })
    if (AT > MAX_ATTEMPT_TIME) {
        res.send("you can't login anymore, wait 30 minutes");
    }
    res.cookie("AttemptTimes", AT, { maxAge: 1000 * 60 * 30, overwrite: true })

    var body = req.body;
    if (body.username == "") {
        console.log("userId can not be empty")
        res.redirect("/");
    }
    if (body.password == "") {
        console.log("password can not be empty")
        res.redirect("/");
    }
    User.find({ AccountID: body.userId }, function (err, doc) {
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
                    text: "userId does not exist",
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
            res.cookie("AttemptTimes", 0, { maxAge: 1000, overwrite: true })
            req.session.userid = result.id;
            req.session.loginState = 0;
            res.redirect("/conflict");
        }
    })

};
exports.userDoRegister = async function (req, res) {
    var body = req.body;
    if (body.username == "") {
        console.log("userId can not be empty")
        res.redirect("/doRegister");
    }
    if (body.password == "") {
        console.log("password can not be empty")
        res.redirect("/doRegister");
    }

    var output = await User.findOne({ AccountID: body.username })
    if (output) {
        console.log("userId exists")
        res.redirect("/doRegister")
    }

    var newUser = new User({
        AccountID: body.userId,
        Password: body.password,
        DateOfRegister: new Date(),
        AccountName: body.username
    })

    newUser.save((err) => {
        if (err) {
            console.log(err)
            return;
        }
    })

    req.session.userid = newUser._id;
    req.session.loginState = 0;
    
    res.redirect("/conflict")

}

exports.userRegister = function (req, res) {
    res.render("register", {});
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
    if (await server.conflictLoginCheck(req, res)) {
        console.log("you take someone")
    }
    console.log("still you")
    res.redirect("/contact/");
}