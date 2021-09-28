const Contact = require("../models/contact");

const getFullContact = async (req, res) => {
    try {
        const contacts = await Contact.find().lean();
        res.json(contacts);
    } catch (err){
        console.log(err)
    }
};


const getSingleContact = async (req, res) => {
    try {
        const contact = await Contact.findOne(
            {_id: req.params.id} 
        ).lean();
        res.json(contact);
    } catch (err){
        console.log(err)
    }
};

const contactEdit = async (req, res) => {
    res.send("contactEdit")
    console.log("contactEdit")
};

const contactCreate = async (req, res) => {
    const contact = new Contact({
        AccountID:req.body.AccountID,
        Company:req.body.Company,
        Email:req.body.Email,
        FullName:req.body.FullName,
        Home:req.body.Home,
        IsActive:req.body.IsActive,
        JobTitle:req.body.JobTitle,
        Notes:req.body.Notes,
        PhoneNumber:req.body.PhoneNumber,
        Tags:req.body.Tags
    });
    contact.save((err,res)=>{
        if (err){
            console.log({success:false,err})
        }
        else {
            console.log({success:true,res})
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