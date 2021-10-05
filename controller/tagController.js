const Tag = require("../models/tag")

const addTag = async (req, res) => {
    try {
        let { tagName, tagOf } = req.body
        var decodedID = jwt.decode(req.token, { complete: true })
        let tagChecked = await Tag.find({ TagName: tagName, TagOf: tagOf, AccountID: decodedID })
        if (!tagChecked) {

            var newTag = new Tag({
                AccountID: decodedID,
                TagName: tagName,
                TagOf: tagOf
            })

            newTag.save((err) => {
                if (err) {
                    console.log(err)
                    return;
                }
                else {
                    res.json({
                        status: 200,
                        msg: "Add tag success"
                    })
                }
            })

        }
    } catch (err) {
        console.log(err);
    }
}

const deleteTag = async function (req, res) {
    try {
        let { tagName, tagOf } = req.body
        var decodedID = jwt.decode(req.token, { complete: true })
        Tag.findOneAndDelete({ TagName: tagName, TagOf: tagOf, AccountID: decodedID })

        res.json({
            status: 200,
            msg: "delete tag success"
        })
    } catch (err) {
        console.log(err)
    }
}

const getTagList = async (req, res) => {
    try {
        let { tagOf } = req.body
        let uid = req.token.userId

        const tags = Tag.find({ TagOf: tagOf, AccountID: uid }, (err) => {
            if (err) {
                res.json({
                    status: 503,
                    msg: "Error occurred: " + err
                })
                return;
            }
        })
        res.json({
            status: 200,
            msg: "Get tags success",
            tags:tags
        })

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addTag,
    deleteTag,
    getTagList
}

