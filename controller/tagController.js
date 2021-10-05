const Tag = require("../models/tag")

const addTag = async (req, res) => {
    try {
        let { tagName, tagOf } = req.body
        var decodedID = jwt.decode(req.token, { complete: true })
        let tagChecked = await Tag.find({ TagName: tagName, TagOf: tagOf, AccountID: decodedID }, (err) => {
            if(err){
                res.status(503).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })
        if (!tagChecked) {

            var newTag = new Tag({
                AccountID: decodedID,
                TagName: tagName,
                TagOf: tagOf
            })

            newTag.save((err) => {
                if (err) {
                    res.status(503).json({
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
        var decodedID = jwt.decode(req.token, { complete: true })
        Tag.findOneAndDelete({ TagName: tagName, TagOf: tagOf, AccountID: decodedID }, (err) => {
            if(err){
                res.status(503).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })

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
        let { tagOf } = req.body
        let uid = req.token.userId

        const tags = Tag.find({ TagOf: tagOf, AccountID: uid }, (err) => {
            if (err) {
                res.status(503).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })
        res.status(200).json({
            msg: "Get tag list successfully",
            tags:tags
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

