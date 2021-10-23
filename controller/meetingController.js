const Bin = require("../models/bin");
const Meeting = require("../models/meeting");
const Tag = require("../models/tag")
const Contact = require("../models/contact");

const fs = require('fs');
const mongoose = require("mongoose")
const getFullMeeting = async (req, res) => {
    try {
        let uid = req.token.userId
        const meetings = await Meeting.find({ AccountID: uid, IsActive: true }, "Title StartTime Location Invitees", (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }

        }).lean();
        res.status(200).json({
            msg: "Get meeting list successfully",
            meetings: meetings
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};

const getMeetingsByTag = async (req, res) => {
    try {
        let uid = req.token.userId
        let tag = req.params.tag
        const meetings = await Meeting.find({ AccountID: uid, Tags: { $elemMatch: { TagName: tag } }, IsActive: true }, "Title StartTime Location Invitees", (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }

        }).lean();
        res.status(200).json({
            msg: "Get meeting list with tag " + tag + " successfully",
            meetings: meetings
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};


const getSingleMeeting = async (req, res) => {
    try {
        let mid = req.params.id
        const meeting = await Meeting.findById(mid, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }

        }).lean();
        res.status(200).json({
            msg: "Get single meeting successfully",
            meeting: meeting
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};


const meetingCreate = async (req, res) => {
    let {
        Title,
        URL,
        Frequency,
        Location,
        StartTime,
        EndTime,
        OtherInvitees,
        Notes,
        NotesKeyWords,
        Attachment,
        InviteeIds,
        TagIds
    } = req.body

    let uid = req.token.userId


    const getInvitees = async () => {
        return Promise.all(InviteeIds.map(async iid => {
            let Invitee = await Contact.findById(iid).lean()
            var InviteeName = Invitee.InviteeName

            let result = {}
            result["InviteeName"] = InviteeName
            result["InviteeId"] = iid

            return Promise.resolve(result)

        }))
    }

    getInvitees().then(async (Invitees) => {
        const getTags = async () => {
            return Promise.all(TagIds.map(async tid => {
                let aTag = await Tag.findById(tid).lean()
                var TagName = aTag.TagName

                let result = {}
                result["TagName"] = TagName
                result["TagId"] = tid

                return Promise.resolve(result)

            }))
        }

        getTags().then(async (Tags) => {
            const meeting = new Meeting({
                AccountID: uid,
                Title: Title,
                URL: URL,
                Frequency: Frequency,
                Location: Location,
                StartTime: StartTime,
                EndTime: EndTime,
                OtherInvitees: OtherInvitees,
                IsActive: true,
                Notes: Notes,
                NotesKeyWords: NotesKeyWords,
                Invitees: Invitees,
                Attachment: Attachment,
                Tags: Tags
            });

            meeting.save((err) => {
                if (err) {
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                }
                else {
                    res.status(200).json({
                        msg: "Create a new meeting successfully"
                    })
                }
            });
        })
    })

};

const meetingEdit = async (req, res) => {
    try {
        let {
            Title,
            URL,
            Frequency,
            Location,
            StartTime,
            EndTime,
            OtherInvitees,
            Notes,
            NotesKeyWords,
            Attachment,
            InviteeIds,
            TagIds
        } = req.body
        let MeetingId = req.params.id;

        const getInvitees = async () => {
            return Promise.all(InviteeIds.map(async iid => {
                let Invitee = await Contact.findById(iid).lean()
                var InviteeName = Invitee.InviteeName

                let result = {}
                result["InviteeName"] = InviteeName
                result["InviteeId"] = iid

                return Promise.resolve(result)

            }))
        }

        getInvitees().then(async (Invitees) => {
            const getTags = async () => {
                return Promise.all(TagIds.map(async tid => {
                    let aTag = await Tag.findById(tid).lean()
                    var TagName = aTag.TagName

                    let result = {}
                    result["TagName"] = TagName
                    result["TagId"] = tid

                    return Promise.resolve(result)

                }))
            }

            getTags().then(async (Tags) => {
                Meeting.findByIdAndUpdate(MeetingId, {
                    Title: Title,
                    URL: URL,
                    Frequency: Frequency,
                    Location: Location,
                    StartTime: StartTime,
                    EndTime: EndTime,
                    OtherInvitees: OtherInvitees,
                    Notes: Notes,
                    NotesKeyWords: NotesKeyWords,
                    Invitees: Invitees,
                    Attachment: Attachment,
                    Tags: Tags
                }, (err) => {
                    if (err) {
                        res.status(400).json({
                            msg: "Error occurred: " + err
                        })
                        return;
                    }
                })
                const meeting = await Meeting.findById(MeetingId).lean();
                res.status(200).json({
                    msg: "Edit meeting successfully",
                    meeting: meeting
                })
            })
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
};

const meetingDelete = async (req, res) => {
    let mid = req.params.id
    let uid = req.token.userId
    let meeting = await Meeting.findByIdAndUpdate(mid, { IsActive: false }, (err) => {
        if (err) {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }
    })

    const deletedItem = new Bin({
        AccountID: uid,
        DeleteDate: new Date(),
        ID: mid,
        Name: meeting.Title,
        Type: "M"
    })
    deletedItem.save((err) => {
        if (err) {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
        }
        else {
            res.status(200).json({
                msg: "Delete meeting successfully"
            })
        }
    });
}

const fuzzySearch = async (req, res) => {
    let keyword = req.params.keyword
    let uid = req.token.userId
    let reg = new RegExp(keyword, "i")
    const searchResult = await Meeting.find({
        $and: [
            {
                $or: [
                    { Title: reg },
                    { Location: reg },
                    { URL: reg },
                    { Invitees: { $elemMatch: { InviteeName: reg } } },
                    { OtherInvitees: reg },
                    { Notes: reg }
                ]
            },
            { IsActive: true, AccountID: uid }
        ]
    },
        "Title StartTime Location Invitees",
        (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        }
    )
    res.status(200).json({
        msg: "Search meeting successfully",
        searchResult: searchResult
    });
};


const uploadAttachment = async (req, res, cb) => {
    try {
        let attachment = req.body.file;
        let attachmentData = fs.readFileSync(attachment.path)


        let uid = req.token.userId;
        Meeting.findOneAndUpdate({ AccountID: uid }, { Attachment: attachmentData }, (err) => {
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
}

const assignTag = async (req, res) => {
    let { tagName } = req.body
    let uid = req.token.userId
    let cid = req.params.id


    let tag = await Tag.findOne({ TagName: tagName, TagOf: "M", AccountID: uid }, "TagName", (err) => {
        if (err) {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }
    }).lean()

    Contact.findByIdAndUpdate(cid, { $push: { Tags: { TagName: tag.TagName, TagId: tag._id } } }, (err) => {
        if (err) {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }
    })


    res.status(200).json({
        msg: "Add tag to this contact successfully"
    })
}

module.exports = {
    getFullMeeting,
    getMeetingsByTag,
    getSingleMeeting,
    meetingCreate,
    meetingEdit,
    meetingDelete,
    fuzzySearch,
    uploadAttachment,
    assignTag
}