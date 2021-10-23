const Contact = require("../models/contact");
const Bin = require("../models/bin");
const Meeting = require("../models/meeting");
const Tag = require("../models/tag")
const mongoose = require("mongoose")


const getFullContact = async (req, res) => {
    try {
        let uid = req.token.userId
        const contacts = await Contact.find({ AccountID: uid, IsActive: true }, "FirstName LastName MobileNo Email", (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        }).lean();
        res.status(200).json({
            msg: "Get contact list successfully",
            contacts: contacts
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        });
    }
};

const getContactsByTag = async (req, res) => {
    try {
        let uid = req.token.userId
        let tag = req.params.tag;
        const contacts = await Contact.find({ AccountID: uid, Tags: { $elemMatch: { TagName: tag } }, IsActive: true }, "FirstName LastName MobileNo Email", (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        }).lean();
        res.status(200).json({
            msg: "Get contact list with tag " + tag + " successfully",
            contacts: contacts
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        });
    }
};

const getSingleContact = async (req, res) => {
    try {
        let cid = req.params.id
        const contact = await Contact.findById(cid,
            { IsActive: 0, AccountID: 0 }, (err) => {
                if (err) {
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
            }).lean();
        const relatedMeeting = await Meeting.find({ Invitees: { elemMatch: { InviteeId: cid } } }, "Title StartTime", (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })
        console.log(relatedMeeting);
        res.status(200).json({
            msg: "Get single contact successfully",
            contact: contact,
            relatedMeeting: relatedMeeting
        });
    } catch (err) {
        res.status(400).json({
            msg: "Error occurred: " + err
        });
    }
};

const contactEdit = async (req, res) => {

    let {
        FirstName,
        LastName,
        MobileNo,
        HomeNo,
        Company,
        Email,
        Address,
        JobTitle,
        Notes,
        DOB,
        Relationship,
        TagIds
    } = req.body
    let ContactId = req.params.id;

    const getData = async () => {
        return Promise.all(TagIds.map(async tid => {
            let aTag = await Tag.findById(tid).lean()
            var TagName = aTag.TagName

            let result = {}
            result["TagName"] = TagName
            result["TagId"] = tid

            return Promise.resolve(result)

        }))
    }

    getData().then(async Tags => {
        console.log(Tags)
        Contact.findByIdAndUpdate(ContactId, {
            IsActive: true,
            FirstName: FirstName,
            LastName: LastName,
            Company: Company,
            Email: Email,
            Address: Address,
            JobTitle: JobTitle,
            Notes: Notes,
            MobileNo: MobileNo,
            HomeNo: HomeNo,
            DOB: DOB,
            Relationship: Relationship,
            Tags: Tags
        }, (err, contact) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
            }
            else {
                res.status(200).json({
                    msg: "Edit a new contact successfully",
                    contact: contact
                });
            }
        });
    })


};

const contactCreate = async (req, res) => {

    let {
        FirstName,
        LastName,
        MobileNo,
        HomeNo,
        Company,
        Email,
        Address,
        JobTitle,
        Notes,
        DOB,
        Relationship,
        TagIds
    } = req.body

    let uid = req.token.userId



    const getData = async () => {
        return Promise.all(TagIds.map(async tid => {
            let aTag = await Tag.findById(tid).lean()
            var TagName = aTag.TagName

            let result = {}
            result["TagName"] = TagName
            result["TagId"] = tid

            return Promise.resolve(result)

        }))
    }

    getData().then(Tags => {
        console.log(Tags)
        const contact = new Contact({
            AccountID: uid,
            IsActive: true,
            FirstName: FirstName,
            LastName: LastName,
            Company: Company,
            Email: Email,
            Address: Address,
            JobTitle: JobTitle,
            Notes: Notes,
            MobileNo: MobileNo,
            HomeNo: HomeNo,
            DOB: DOB,
            Relationship: Relationship,
            Tags: Tags
        });
        contact.save((err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
            }
            else {
                res.status(200).json({
                    msg: "Create a new contact successfully",
                    contact: contact
                });
            }
        });
    })


}

const contactDelete = async (req, res) => {
    let cid = req.params.id
    let uid = req.token.userId
    let contact = await Contact.findByIdAndUpdate(cid, { IsActive: false }, (err) => {
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
        ID: cid,
        Name: contact.FirstName,
        Type: "C"
    })
    deletedItem.save((err) => {
        if (err) {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            console.log(err);
        }
        else {
            res.status(200).json({
                msg: "Delete contact successfully"
            });
        }
    });

}

const fuzzySearch = async (req, res) => {
    let keyword = req.params.keyword
    let uid = req.token.userId
    let reg = new RegExp(keyword, "i")
    const searchResult = await Contact.find({
        $and: [
            {
                $or: [
                    { FirstName: reg },
                    { LastName: reg },
                    { Email: reg },
                    { Address: reg },
                    { MobileNo: reg },
                    { HomeNo: reg },
                    { Notes: reg }
                ]
            },
            { IsActive: true, AccountID: uid }
        ]
    },
        "FirstName LastName MobileNo Email",
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
        msg: "Search contact successfully",
        searchResult: searchResult
    });
};

const addToMeeting = async (req, res) => {
    let mids = req.body.mids
    let cid = req.params.id


    const getData = async () => {
        return Promise.all(mids.map(async mid => {
            let meeting = await Meeting.findOne({ _id: mid, Invitees: { $elemMatch: { InviteeId: cid } }, IsAlive: true }, "Invitees", (err) => {
                if (err) {
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
            }).lean()

            console.log(meeting)
            if (!meeting) {
                let thisMeeting = await Meeting.findById(mid, (err) => {
                    if (err) {
                        res.status(400).json({
                            msg: "Error occurred: " + err
                        })
                        return;
                    }
                })

                let contact = await Contact.findById(cid, (err) => {
                    if (err) {
                        res.status(400).json({
                            msg: "Error occurred: " + err
                        })
                        return;
                    }
                })

                thisMeeting.Invitees.splice(0, 0, { InviteeName: contact.FirstName, InviteeId: cid })
                thisMeeting.save((err) => {
                    if (err) {
                        res.status(400).json({
                            msg: "Error occurred: " + err
                        })
                        return;
                    }
                })
                
                return Promise.resolve("ok")
            }else{
                return Promise.resolve("exist")
            }
            

        }))
    }

    getData().then(res => {
        console.log(res)
    })

    res.status(200).json({
        msg: "Add this contact to meetings successfully"
    })

}


const getPhoto = async (req, res) => {
    try {
        let cid = req.params.id
        const contact = await Contact.findById(cid, (err) => {
            if (err) {
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        });
        res.status(200).json({
            msg: "Get contact photo successfully",
            photo: contact.photo
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
}

const savePhoto = async (req, res, cb) => {
    try {
        let photoFile = req.body.file;
        let photoData = fs.readFileSync(photoFile.path)


        let cid = req.params.id;
        Contact.findByIdAndUpdate(cid, { Photo: photoData }, (err) => {
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
const assignTag = async (req, res) => {
    let { tagName } = req.body
    let uid = req.token.userId
    let cid = req.params.id


    let tag = await Tag.findOne({ TagName: tagName, TagOf: "C", AccountID: uid }, "TagName", (err) => {
        if (err) {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }
    }).lean()

    if(!tag){
        res.status(403).json({
            msg: "Tag do not exist"
        })
        return;
    }
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
    getFullContact,
    getContactsByTag,
    getSingleContact,
    contactEdit,
    contactCreate,
    contactDelete,
    fuzzySearch,
    addToMeeting,
    getPhoto,
    savePhoto,
    assignTag
}
