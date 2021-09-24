const express = require("express");

const userRouter = express.Router();

const multer = require('multer');
const path=require('path')
var userController = require("../controller/userController.js");


// user login
userRouter.get("/", userController.userLogin);

userRouter.get("/conflict",userController.conflictLogin);

userRouter.post("/login", userController.doLogin);

// new user registration
userRouter.get("/register", userController.userRegister);

userRouter.post("/doRegister", userController.userDoRegister);

// show user profile
userRouter.get("/profile", userController.getProfile);

userRouter.post("/upload", uploadFile, userController.savePhoto);

function uploadFile (req, res, next) {
    let fullPath = path.resolve("attachment");
    let filename = "";
    let storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,fullPath);
        },
        filename:(req,file,cb)=>{
            let extname = path.extname(file.originalname);
            filename=file.filename+"-"+Date.now()+extname;
            cb(null,filename);
        }
    })

    let upload = multer({storage}).single("photo");
    upload(req, res, (err) => {
        if(err instanceof multer.MulterError) {
            res.send("multererr" + err);
        } else if (err){
            res.send("other err:"+ err)
        } else {
            req.body.photo = req.file;
            next();
        }
    })
};

// user change password
userRouter.post("/changePassword", userController.changePassword);

// user change details
userRouter.post("/changeDetails", userController.changeDetails);

//export the router
module.exports = userRouter;