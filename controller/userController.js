const MAX_ATTEMPT_TIME = 5;

const User = require("../models/user")
const Theme = require("../models/theme")
const fs = require('fs');
const { PRIVATE_KEY, EXPIRESD } = require("../utils/token")
const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("../utils/encrypt");
const SecurityQuestion = require("../models/securityQuestion");

// login to a user account
const doLogin = (req, res) => {
    if (req.cookies.AttemptTimes == undefined) {
        res.cookie("AttemptTimes", 0, { maxAge: 1000 * 60 * 30, overwrite: true })
    }
    let AT = req.cookies.AttemptTimes;
    AT++;
    res.cookie("AttemptTimes", AT, { maxAge: 1000 * 60 * 30, overwrite: true })
    if (AT > MAX_ATTEMPT_TIME) {
        res.status(403).json({
            msg: "you can't try login anymore, wait 30 minutes"
        })
        return;
    }


    try {
        let { userId, password } = req.body;
        let ePassword = encrypt(password)
        console.log({ userId, ePassword })
        var token = jwt.sign({ userId }, PRIVATE_KEY, { expiresIn: EXPIRESD });
        User.findOneAndUpdate({ UserID: userId, Password: ePassword }, {Token: token}, (err, account) => {

            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            } else {
                if (account) {
                    res.cookie("AttemptTimes", 0, { maxAge: 1000, overwrite: true })
                    
                    res.status(200).json({
                        msg: "Login successfully",
                        token: token
                    })
                    return;
                } else {
                    res.status(403).json({
                        msg: "Incorrect userId/password"
                    })
                    return;
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }

};

// send a list of security question
const getQuestionList = async (req, res) => {
    try {
        SecurityQuestion.find((err, questions) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            } else {
                res.status(200).json({
                    msg: "Get security question list successfully",
                    questions: questions
                })
            }
        })


    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }

}

// register a new user account
const userDoRegister = async (req, res) => {

    let {
        userId,
        password,
        username,
        securityQuestion,
        securityAnswer
    } = req.body;
    try {
        let user = await User.findOne({ UserID: userId })

        if (user && user.length != 0) {
            res.status(403).json({
                msg: "This userId has already been used"
            })
        } else {

            let ePassword = encrypt(password);

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
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                } else {
                    res.status(200).json({
                        msg: "Register successfully"
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }

}

// send color setting of user
const userPreferredColor = async (req, res) => {
    try {
        let uid = req.token.userId

        let thisAccount = await User.findOne({ UserID: uid }).lean();
        let colorId = thisAccount.Color;
        if (!colorId) {
            colorId = "616a44b350b370d550ad657e"
            User.findOneAndUpdate({ UserID: uid }, { Color: colorId }, (err) => {
                if (err) {
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }

            })
        }
        let theme = Theme.findById(colorId, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })
        res.status(200).json({
            msg: "Get preferred color successfully",
            theme: theme
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};

// change color setting
const userChangePreferredColor = async (req, res) => {
    let uid = req.token.userId

    let { colorId } = req.body

    const theme = Theme.findById(colorId, (err) => {
        if (err) {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }
    })
    if (!theme) {
        res.status(403).json({
            msg: "Theme not exist"
        })
        return;
    }
    User.findOneAndUpdate({ UserID: uid }, { Color: colorId }, (err) => {
        if (err) {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
        } else {
            res.status(200).json({
                msg: "Change preferred color successfully"
            })
        }
    })
}

// send detail of user profile
const getProfile = async (req, res) => {
    try {
        let uid = req.token.userId
        var thisAccount = await User.findOne({ UserID: uid }, "Email PhoneNumber UserName UserID", (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        });
        res.status(200).json({
            msg: "Get user profile successfully",
            info: thisAccount
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};

// send photo of user
const getPhoto = async (req, res) => {
    try {
        console.log(req.token)
        let uid = req.token.userId
        var thisAccount = await User.findOne({ UserID: uid }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        });

        res.status(200).json({
            msg: "Get user photo successfully",
            photo: thisAccount.Photo.toString('base64')
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
}

// send security question chosen in registration
const forgetPassword = async (req, res) => {
    try {
        let uid = req.body.userId
        let thisAccount = await User.findOne({ UserID: uid }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })
        if(!thisAccount){
            res.status(403).json({
                msg: "Non existent UserId"
            })
        }
        let sqCode = thisAccount.securityQuestion;
        let question = SecurityQuestion.findOne({ Code: sqCode }, (err) => {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        })
        res.status(200).json({
            msg: "Get security question successfully",
            securityQuestion: question
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
}

// change password with security question checking
const changeForgottenPassword = async (req, res) => {
    try {
        let { userId, sa, np } = req.body

        let thisAccount = await User.findOne({ UserID: userId }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
            }
        })
        if (sa !== thisAccount.SecurityAnswer) {
            res.status(403).json({
                msg: "Fail to pass security question"
            })
        } else {
            User.findOneAndUpdate({ UserID: userId }, { Password: encrypt(np) }, (err) => {
                if (err) {
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
            })

            res.status(200).json({
                msg: "password has been changed successfully"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};

// change password when you have login
const changePassword = async (req, res) => {
    try {
        let { op, np } = req.body
        let uid = req.token.userId

        let thisAccount = await User.findOne({ UserID: uid, Password: encrypt(op) }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: "+ err
                })
            }
        })

        if (!thisAccount) {
            res.status(403).json({
                msg: "Password incorrect"
            })
        }
        User.findOneAndUpdate({ UserID: uid }, { Password: encrypt(np) }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })

        res.status(200).json({
            msg: "password has been changed successfully"
        })

    } catch (err) {
        console.log(err)
    }


};

// upload a photo
const savePhoto = async (req, res, cb) => {
    try {
        let photoFile = req.body.file;
        let photoData = fs.readFileSync(photoFile.path)


        let uid = req.token.userId;
        User.findOneAndUpdate({ UserID: uid }, { Photo: photoData }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })
        cb();
        res.status(200).json({
            msg: "Upload successfully"
        })

    } catch (err) {
        console.log(err)
        cb();
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }

};

// edit information of user profile
const changeDetails = (req, res) => {
    let uid = req.token.userId
    let { phoneNumber, Email } = req.body
    User.findOneAndUpdate({ UserID: uid }, { PhoneNumber: phoneNumber, Email: Email }, (err) => {
        if (err) {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        } else {
            res.status(200).json({
                msg: "Edit user information successfully"
            })
        }
    })
};

module.exports = {
    userLogin,
    doLogin,
    getQuestionList,
    userDoRegister,
    userPreferredColor,
    getProfile,
    getPhoto,
    forgetPassword,
    changeForgottenPassword,
    changePassword,
    savePhoto,
    changeDetails,
    userChangePreferredColor
}
