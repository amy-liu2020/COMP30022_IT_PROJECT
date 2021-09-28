const MAX_ATTEMPT_TIME = 5;
const PRIVATE_KEY = "APriVatekEy"
const EXPIRESD = 60 * 60 * 24

const User = require("../models/user")
const server = require("../server")
const fs = require('fs');

const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("../utils/encrypt");

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


    try {
        let { userId, password } = req.body;
        if (userId == "") {
            console.log("userId can not be empty")
            res.status(403).json("userId can not be empty");
        }
        if (password == "") {
            console.log("password can not be empty")
            res.status(403).json("password can not be empty");
        }
        let ePassword = encrypt(password)
        User.findOne({ UserID: userId, Password: ePassword }, function (err, account) {
            if (err) {
                res.json({
                    status: 403,
                    data: "Error occured: " + err
                });
            } else {
                if (account) {
                    res.cookie("AttemptTimes", 0, { maxAge: 1000, overwrite: true })
                    let token = jwt.sign({ userId }, PRIVATE_KEY, { expiresIn: EXPIRESD });
                    res.json({
                        status: 200,
                        data: account,
                        token: token
                    });
                } else {
                    res.json({
                        status: 403,
                        data: "Incorrect userId/password"
                    });
                }
            }
        });
    } catch (err) {
        console.log(err);
    }


    // User.find({ UserID: body.userId }, function (err, doc) {
    //     let result = {};
    //     if (err) {
    //         result = {
    //             id: err,
    //             text: "database error",
    //             code: "E"
    //         }
    //     } else {
    //         if (!doc.length) {
    //             result = {
    //                 id: doc,
    //                 text: "userId does not exist",
    //                 code: "E"
    //             }
    //         } else if (body.password == doc[0].Password) {
    //             result = {
    //                 id: doc[0]._id,
    //                 text: "login successful",
    //                 code: "S"
    //             }
    //         } else if (body.password != doc[0].Password) {
    //             result = {
    //                 id: doc[0]._id,
    //                 text: "password incorrect",
    //                 code: "E"
    //             }
    //         }
    //     }

    //     console.log(result.text);
    //     if (result.code == "E") {
    //         res.redirect("/");
    //     } else if (result.code = "S") {
    //         res.cookie("AttemptTimes", 0, { maxAge: 1000, overwrite: true })
    //         req.session.userid = result.id;
    //         req.session.loginState = 0;
    //         res.redirect("/conflict");
    //     }
    // })

};
exports.userDoRegister = async function (req, res) {


    let {
        userId,
        password,
        username,
        securityQuestion,
        securityAnswer
    } = req.body;
    try {
        // 查询当前用户名在不在数据库中(使用async方法后必须使用await方法才有值返回，不然返回promise对象)
        let user = await User.findOne({UserID: userId })
        // 存在res即是数据库中有数据
        if (user && user.length != 0) {
            res.json({
                status: 403,
                msg: "user exists"
            })
        } else {
            // 对密码进行加密
            ePassword = encrypt(password);
            // async 和 await 向数据库插入数据
            var newUser = new User({
                UserID: userId,
                Password: ePassword,
                DateOfRegister: new Date(),
                UserName: username,
                SecurityQuestion: securityQuestion,
                SecurityAnswer: securityAnswer
            })

            newUser.save((err) => {
                if (err) {
                    res.json({
                        status: 403,
                        data: "Error occured: " + err
                    });
                }
            })

            res.json({
                status: 200,
                msg: "register success"
            })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }



    // var body = req.body;
    // if (body.username == "") {
    //     console.log("userId can not be empty")
    //     res.redirect("/doRegister");
    // }
    // if (body.password == "") {
    //     console.log("password can not be empty")
    //     res.redirect("/doRegister");
    // }

    // var output = await User.findOne({ UserID: body.username })
    // if (output) {
    //     console.log("userId exists")
    //     res.redirect("/doRegister")
    // }

    // var newUser = new User({
    //     AccountID: body.userId,
    //     Password: body.password,
    //     DateOfRegister: new Date(),
    //     AccountName: body.username,
    //     SecurityQuestion: body.securityQuestion,
    //     SecurityAnswer: body.securityAnswer
    // })

    // newUser.save((err) => {
    //     if (err) {
    //         console.log(err)
    //         return;
    //     }
    // })

    // req.session.userid = newUser._id;
    // req.session.loginState = 0;

    // res.redirect("/conflict")

}

exports.userRegister = function (req, res) {
    res.render("register", {});
};
exports.getProfile = function (req, res) {
    res.render("userProfile", {})
};
exports.changePassword = async function (req, res) {
    try{
        let uid = jwt.decode(req.token,{complete:true}).userId;
        var thisAccount = await User.findById(uid);
        if (thisAccount.password != req.body.oldPassword) {
            res.json({
                status: 403,
                msg: "old password incorrect"
            })
        }
        
        User.findByIdAndUpdate(uid, {Password: req.body.newPassword})
        
        res.json({
            status: 200,
            msg: "password has been changed successfully"
        })
    } catch (err){
        console.log(err)
    }
    

};
exports.savePhoto = async function (req, res) {
    try{
        let photoFile = req.body.photo;
        let photoData = fs.readFileSync(photoFile.path)
        let uid = jwt.decode(req.token,{complete:true}).userId;
        User.findByIdAndUpdate(uid, { Photo: photoData }, (err) => {
            if (err) {
                res.json({
                    status: 403,
                    data: "Error occured: " + err
                });
            }
        })
    
        res.json({
            status: 200,
            data: "file upload successfully"
        });
    } catch (err){
        console.log(err)
    }

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
    res.redirect("/profile");
}