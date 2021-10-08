const Contact = require("../models/contact");
const Bin = require("../models/bin")

const getFullContact = async (req, res) => {
    try {
        let uid = req.token.userId
        const contacts = await Contact.find({AccountID:uid, IsActive:true}, (err) => {
            if(err){
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        }).lean();
        res.status(200).json({
            msg:"Get contact list successfully",
            contacts:contacts
        })
    } catch (err){
        console.log(err)
        res.status(400).json({
            msg: "Error occurred: " + err
        });
    }
};

const getSingleContact = async (req, res) => {
    try {
        let cid = req.params.id
        const contact = await Contact.findById(cid, (err) => {
            if(err){
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        }).lean();
        res.status(200).json({
            msg: "Get single contact successfully",
            contact:contact
        });
    } catch (err){
        res.status(400).json({
            msg: "Error occurred: " + err
        });
    }
};

const contactEdit = async (req, res) => {
    try {
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
            Tags
        } = req.body
        let ContactId = req.params.id;
        Contact.findByIdAndUpdate(ContactId, {FirstName:FirstName, LastName:LastName, Company:Company, Email:Email, Address:Address, JobTitle:JobTitle, Notes:Notes, MobileNo:MobileNo, HomeNo:HomeNo, DOB:DOB, Relationship:Relationship, Tags:Tags}, (err, doc)=>{
            if(err){
                res.status(400).json({
                    msg: "Error occurred: " + err
                })
                return;
            }
        })
        const contact = await Contact.findById(ContactId).lean();
        res.status(200).json({
            msg: "Edit successfully",
            contact:contact
        });
    } catch (err){
        console.log(err);
        res.status(400).json({
            msg: "Error occurred: " + err
        });
    }
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
        Tags
    } = req.body

    let uid = req.token.userId

    const contact = new Contact({
        AccountID:uid,
        IsActive: true,
        FirstName:FirstName, 
        LastName:LastName, 
        Company:Company, 
        Email:Email, 
        Address:Address, 
        JobTitle:JobTitle, 
        Notes:Notes, 
        MobileNo:MobileNo, 
        HomeNo:HomeNo, 
        DOB:DOB, 
        Relationship:Relationship, 
        Tags:Tags
    });
    contact.save((err)=>{
        if (err){
            res.status(400).json({
                msg: "Error occurred: " + err
            })
        }
        else {
            res.status(200).json({
                msg: "Create a new contact successfully"
            });
        }
    });
}

const contactDelete = async (req,res) => {
    let cid = req.params.id
    let uid = req.token.userId
    Contact.findByIdAndUpdate(cid, {IsActive:false}, (err) =>{
        if(err){
            res.status(400).json({
                msg: "Error occurred: " + err
            })
            return;
        }
    })

    const deletedItem = new Bin({
        AccountID:uid,
        DeleteDate:new Date(),
        ID:cid,
        Type:"C"
    })

    deletedItem.save((err)=>{
        if (err){
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

const searching = async (req, res) => {
    
};  
const getDeletedItems = async (req, res)=> {
    res.send("getDeletedItems")
    console.log("getDeletedItems")
};

module.exports = {getFullContact, getSingleContact,contactEdit,contactCreate,contactDelete,searching,getDeletedItems}
