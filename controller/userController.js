const MAX_ATTEMPT_TIME = 5;

const User = require("../models/user")
const Theme = require("../models/theme")
const fs = require('fs');
const { PRIVATE_KEY, EXPIRESD } = require("../utils/token")
const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("../utils/encrypt");
const SecurityQuestion = require("../models/securityQuestion");


const userLogin = async (req, res) => {
    // let reg = new RegExp("mesi","i")
    // console.log(reg)
    // // let users = await User.find({SecurityQuestion: 0}, {Password:0, Color:0})
    // let users = await User.findOne({$and:[{$or:[{UserID:{$regex:reg}}, {UserName: /phasdd/i}]},{UserID:/one/i}]}, 'UserID UserName')
    // console.log(users)


    res.render("login", {});
};

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
        let token = jwt.sign({ userId }, PRIVATE_KEY, { expiresIn: EXPIRESD });
        User.findOneAndUpdate({ UserID: userId, Password: ePassword },{Token:token}, (err, account) => {
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

const userPreferredColor = async (req, res) => {
    try {
        let uid = req.token.userId

        let thisAccount = await User.findOne({ UserID: uid }).lean();
        let color = thisAccount.Color;
        if (!color) {
            color = "Green"
            User.findOneAndUpdate({ UserID: uid }, { Color: color }, (err) => {
                if (err) {
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }

            })
        }
        let theme = Theme.findOne({ ColorName: color }, (err) => {
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

const userChangePreferredColor = async (req, res) => {
    let uid = req.token.userId

    let { colorName } = req.body

    const theme = Theme.findOne({ ColorName: colorName }, (err) => {
        if (err) {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }
    })
    if (!theme) {
        res.status(404).json({
            msg: "Error occurred: " + err
        })
        return;
    }
    User.findOneAndUpdate({ UserID: uid }, { Color: colorName }, (err) => {
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

const getProfile = async (req, res) => {
    try {
        let uid = req.token.userId
        var thisAccount = await User.findOne({ UserID: uid },"Email PhoneNumber UserName UserID", (err) => {
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

const getPhoto = async (req, res) => {
    try {
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
            photo: thisAccount.photo
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
}

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
        console.log(thisAccount.SecurityAnswer)
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

const changePassword = async (req, res) => {
    try {
        let { sa, np } = req.body
        let uid = req.token.userId

        let thisAccount = await User.findOne({ UserID: uid }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
            }
        })
        console.log(thisAccount.SecurityAnswer)
        if (sa !== thisAccount.SecurityAnswer) {
            res.status(403).json({
                msg: "Fail to pass security question"
            })
        } else {
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
        }

    } catch (err) {
        console.log(err)
    }


};

const savePhoto = async (req, res) => {
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

        res.status(200).json({
            msg: "Upload successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }

};

const changeDetails = (req, res) => {
    let uid = req.token.userId
    let { UserName, PhoneNumber, Email } = req.body
    User.findOneAndUpdate({ UserID: uid }, { UserName: UserName, PhoneNumber: PhoneNumber, Email: Email }, (err) => {
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