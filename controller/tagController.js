const Tag = require("../models/tag")
const Contact = require("../models/contact");
const Meeting = require("../models/meeting");

const addTag = async (req, res) => {
    try {
        let { tagName, tagOf } = req.body
        var uid = req.token.userId;
        let tagChecked = await Tag.findOne({ TagName: tagName, TagOf: tagOf, AccountID: uid }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })
        if (!tagChecked) {

            var newTag = new Tag({
                AccountID: uid,
                TagName: tagName,
                TagOf: tagOf
            })

            newTag.save((err) => {
                if (err) {
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
                else {
                    res.status(200).json({
                        msg: "Add tag successfully"
                    })
                }
            })

        } else {
            res.status(403).json({
                msg: "Tag exists"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
}

const deleteTag = async function (req, res) {
    try {
        let { tagName, tagOf } = req.body
        var uid = req.token.userId;
        Tag.findOneAndDelete({ TagName: tagName, TagOf: tagOf, AccountID: uid }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })

        if (tagOf == "C") {
            let contacts = await Contact.find({ AccountID: uid }, "Tags", (err) => {
                if (err) {
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                }
                return;
            }).lean();

            contacts.forEach((contact) => {
                Contact.findByIdAndUpdate(contact._id, { $pull: { Tags: { TagName: tagName } } }, (err) => {
                    if (err) {
                        res.status(400).json({
                            msg: "Error occurred: " + err
                        })
                        return;
                    }
                })

            })
        } else if (tagOf == "M") {
            let meetings = await Meeting.find({ AccountID: uid }, "Tags", (err) => {
                if (err) {
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
            }).lean();

            meetings.forEach((meeting) => {
                Meeting.findByIdAndUpdate(meeting._id, { $pull: { Tags: { TagName: tagName } } }, (err) => {
                    if (err) {
                        res.status(400).json({
                            msg: "Error occurred: " + err
                        })
                        return;
                    }
                })

            })
        }

        res.status(200).json({
            msg: "Delete tag successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
}

const getTagList = async (req, res) => {
    try {
        let tagOf = req.params.tagOf
        let uid = req.token.userId

        const tags = await Tag.find({ TagOf: tagOf, AccountID: uid }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })



        res.status(200).json({
            msg: "Get tag list successfully",
            tags: tags
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
}

module.exports = {
    addTag,
    deleteTag,
    getTagList
}
