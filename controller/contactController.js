const Contact = require("../models/contact");

const getFullContact = async (req, res) => {
    try {
        let uid = req.token.userId
        const contacts = await Contact.find({AccountID:uid, IsActive:true}).lean();
        res.json({
            status:200,
            msg:"Get full meetings successfully",
            contacts
        });
    } catch (err){
        console.log(err)
        res.json({
            status: 503,
            msg: "get contact list fail: " + err
        });
    }
};

const getSingleContact = async (req, res) => {
    try {
        let cid = req.params.id
        const contact = await Contact.findById(cid).lean();
        res.json({
            status:200,
            msg:"Get single contact successfully",
            contacts:contact
        });
    } catch (err){
        res.json({
            status: 400,
            msg: "get single contact fail" + err
        });
    }
};

const contactEdit = async (req, res) => {
    res.send("contactEdit")
    console.log("contactEdit")
};

const contactCreate = async (req, res) => {

    let {
        Company,
        Email,
        FullName,
        Home,
        JobTitle,
        Notes,
        PhoneNumber,
        Tags
    } = req.body

    let uid = req.token.userId

    const contact = new Contact({
        AccountID:uid,
        Company:Company,
        Email:Email,
        FullName:FullName,
        Home:Home,
        IsActive:true,
        JobTitle:JobTitle,
        Notes:Notes,
        PhoneNumber:PhoneNumber,
        Tags:Tags
    });
    contact.save((err)=>{
        if (err){
            res.json({
                status: 503,
                msg: "create contact fail: " + err
            });
        }
        else {
            res.json({
                status: 200,
                msg: "create contact success"
            });
        }
    });
}

const searching = async (req, res) => {
    res.send("searching")
    console.log("searching")
};  
const getDeletedItems = async (req, res)=> {
    res.send("getDeletedItems")
    console.log("getDeletedItems")
};

module.exports = {getFullContact, getSingleContact,contactEdit,contactCreate,searching,getDeletedItems}