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
        res.json({
            status: 403,
            msg: "you can't login anymore, wait 30 minutes"
        });
    }
    res.cookie("AttemptTimes", AT, { maxAge: 1000 * 60 * 30, overwrite: true })


    try {
        let { userId, password } = req.body;
        if (userId == "") {
            console.log("userId can not be empty")
            res.json({
                status:403,
                msg:"userId can not be empty"
            });
            return;
        }
        if (password == "") {
            console.log("password can not be empty")
            res.json({
                status:403,
                msg:"password can not be empty"
            });
            return;
        }
        let ePassword = encrypt(password)
        console.log({userId,ePassword})
        User.findOne({ UserID: userId, Password: ePassword }, function (err, account) {
            if (err) {
                res.json({
                    status: 503,
                    msg: "Error occured: " + err
                });
                return;
            } else {
                if (account) {
                    res.cookie("AttemptTimes", 0, { maxAge: 1000, overwrite: true })
                    let token = jwt.sign({ userId }, PRIVATE_KEY, { expiresIn: EXPIRESD });
                    res.json({
                        status: 200,
                        msg: "login success",
                        token: token
                    });
                    return;
                } else {
                    res.json({
                        status: 403,
                        msg: "Incorrect userId/password"
                    });
                    return;
                }
            }
        });
    } catch (err) {
        console.log(err);
    }

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
        if (userId == "") {
            console.log("userId can not be empty")
            res.json({
                status:403,
                msg:"userId can not be empty"
            });
            return;
        }
        if (password == "") {
            console.log("password can not be empty")
            res.json({
                status:403,
                msg:"password can not be empty"
            });
            return;
        }


    
        let user = await User.findOne({ UserID: userId })
        
        if (user && user.length != 0) {
            res.json({
                status: 403,
                msg: "user exists"
            })
        } else {
            
            ePassword = encrypt(password);
            
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
                        status: 503,
                        msg: "Error occured: " + err
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

}

exports.userRegister = function (req, res) {
    res.render("register", {});
};


exports.getProfile = async function (req, res) {
    try {
        let uid = req.token.userId
        var thisAccount = await User.findOne({UserID:uid},(err)=>{
            if(err){
                res.status(503)
            }
        });
        console.log(thisAccount)
        let p = thisAccount.Password
        console.log(encrypt(p))
        res.json({
            status:200,
            info: {
                userId: thisAccount.UserID,
                username: thisAccount.UserName,
                email: thisAccount.Email,
                phoneNumber: thisAccount.PhoneNumber,
                password: decrypt(thisAccount.Password)
            }
        })
    } catch (err) {
        console.log(err)
    }
};

exports.forgetPassword = async function(req,res){
    try{
        let uid = req.body.userId
        let thisAccount = await User.findOne({UserID:uid}, (err)=>{
            if(err){
                res.json({
                    status: 503,
                    msg: "Error occured: " + err
                });
            }
        })
        res.json({
            status:200,
            securityQuestion: thisAccount.SecurityQuestion
        })

    }catch(err){
        console.log(err)
    }
}

exports.changeForgottenPassword = async function (req, res) {
    try {
        let {userId, sa, np} = req.body

        let thisAccount = await User.findOne({UserID:userId}, (err)=>{
            if(err){
                res.json({
                    status: 503,
                    msg: "Error occured: " + err
                });
            }
        })
        console.log(thisAccount.SecurityAnswer)
        if(sa !== thisAccount.SecurityAnswer){
            res.json({
                status: 403,
                msg: "Fail to pass security question"
            });
        } else{
            User.findOneAndUpdate({UserID:userId},{Password:encrypt(np)},(err)=>{
                if(err){
                    res.json({
                        status: 503,
                        msg: "Error occured: " + err
                    });
                }
            })
    
            res.json({
                status: 200,
                msg: "password has been changed successfully"
            })
        }
        
    } catch (err) {
        console.log(err)
    }
};

exports.changePassword = async function (req, res) {
    try {
        let {sa, np} = req.body
        let uid = req.token.userId

        let thisAccount = await User.findOne({UserID:uid}, (err)=>{
            if(err){
                res.json({
                    status: 503,
                    msg: "Error occured: " + err
                });
            }
        })
        console.log(thisAccount.SecurityAnswer)
        if(sa !== thisAccount.SecurityAnswer){
            res.json({
                status: 403,
                msg: "Fail to pass security question"
            });
        } else{
            User.findOneAndUpdate({UserID:uid},{Password:encrypt(np)},(err)=>{
                if(err){
                    res.json({
                        status: 503,
                        msg: "Error occured: " + err
                    });
                }
            })
    
            res.json({
                status: 200,
                msg: "password has been changed successfully"
            })
        }
        
    } catch (err) {
        console.log(err)
    }


};
exports.savePhoto = async function (req, res) {
    try {
        let photoFile = req.body.photo;
        let photoData = fs.readFileSync(photoFile.path)


        let uid = req.token.userId;
        User.findOneAndUpdate({UserID: uid}, { Photo: photoData }, (err) => {
            if (err) {
                res.json({
                    status: 503,
                    msg: "Error occured: " + err
                });
            }
        })

        res.json({
            status: 200,
            msg: "file upload successfully"
        });
    } catch (err) {
        console.log(err)
    }

};
exports.changeDetails = function (req, res) {
    res.send("Details")
    console.log("Details")
};

