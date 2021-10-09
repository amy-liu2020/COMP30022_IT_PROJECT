const Bin = require("../models/bin")
const Contact = require("../models/contact");
const Meeting = require("../models/meeting");

const getBinList = async (req,res) => {
    try {
        let uid = req.token.userId

        const binList = await Bin.find({AccountID:uid}, (err) => {
            if(err){
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        }).lean()
    
        res.status(200).json({
            msg: "Get bin list successfully",
            binList:binList
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        })
    }
    
}


const getBinItem = async (req,res) => {
    let bid = req.params.id;

    const item = await Bin.findById(bid, (err) => {
        res.status(400).json({
            msg: "Error occurred: " + err
        })
        return;
    }).lean()

    if(!item){
        res.status(503).json({
            msg: "Database error"
        })
        return;
    } else {
        if(item.Type === "C"){
            let cid = item.ID;
            const deletedContact = await Contact.findById(cid, (err) => {
                if(err){
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
            }).lean()
            if(!deletedContact){
                res.status(503).json({
                    msg: "Database error"
                })
                return;
            } else {
                res.status(200).json({
                    msg: "Get single deleted contact successfully",
                    deletedContact:deletedContact
                })
                return;
            }
        } else if(item.Type === "M"){
            let mid = item.ID;
            const deletedMeeting = await Meeting.findById(mid, (err) => {
                if(err){
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
            }).lean()
            if(!deletedMeeting){
                res.status(503).json({
                    msg: "Database error"
                })
                return;
            } else {
                res.status(200).json({
                    msg: "Get single deleted meeting successfully",
                    deletedMeeting:deletedMeeting
                })
                return;
            }
        }
    }
}


const deleteBinItem = async (req,res) => {
    let bid = req.params.id
    const item = await Bin.findById(bid, (err) => {
        res.status(400).json({
            msg: "Error occurred: " + err
        })
        return;
    }).lean()

    if(!item){
        res.status(503).json({
            msg: "Database error"
        })
        return;
    } else {
        if(item.Type === "C"){
            let cid = item.ID;
            Contact.findByIdAndDelete(cid, (err) => {
                if(err){
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
            })
        } else if(item.Type === "M"){
            let mid = item.ID;
            Meeting.findByIdAndDelete(mid, (err) => {
                if(err){
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
            })
        }
        Bin.findByIdAndDelete(bid, (err) => {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        })
        res.status(200).json({
            msg: "Delete bin item successfully"
        })
    }
}


const restoreBinItem = async (req,res) => {
    let bid = req.params.id;

    const item = await Bin.findById(bid, (err) => {
        res.status(400).json({
            msg: "Error occurred: " + err
        })
        return;
    }).lean()

    if(!item){
        res.status(503).json({
            msg: "Database error"
        })
        return;
    } else {
        if(item.Type === "C"){
            let cid = item.ID;
            Contact.findByIdAndUpdate(cid, {IsActive:true},(err) => {
                if(err){
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
            }).lean()
        } else if(item.Type === "M"){
            let mid = item.ID;
            Meeting.findByIdAndUpdate(mid, {IsActive:true}, (err) => {
                if(err){
                    res.status(400).json({
                        msg: "Error occurred: " + err
                    })
                    return;
                }
            })
        }

        Bin.findByIdAndDelete(bid, (err) => {
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        })
        res.status(200).json({
            msg: "Restore bin item successfully"
        })
    }
}


const clearAll = async (req,res) => {
    let uid = req.token.userId

    Bin.deleteMany({AccountID:uid}, (err)=>{
        if(err){
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }
    })
    res.status(200).json({
        msg: "Clear all items in bin successfully"
    })
}



exports.module = {getBinList, getBinItem, deleteBinItem, restoreBinItem, clearAll}



