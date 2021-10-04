const express = require("express");

const userRouter = express.Router();

const path=require('path')
const userController = require("../controller/userController.js");
const {ensureAuthorized} = require("../utils/token.js");
const {uploadFile} = require('../utils/multer.js')


// user login
userRouter.get("/", userController.userLogin);

userRouter.post("/login", userController.doLogin);

// new user registration
userRouter.get("/userPreferredColor", ensureAuthorized, userController.userPreferredColor);

userRouter.post("/doRegister", userController.userDoRegister);

// show user profile
userRouter.get("/profile", ensureAuthorized, userController.getProfile);

userRouter.get("/uploadPhoto", (req,res)=>{
    res.render("userProfile",{})
})

userRouter.post("/upload", uploadFile, ensureAuthorized, userController.savePhoto);

// user change password
userRouter.post("/changePassword", ensureAuthorized, userController.changePassword);

// user forget the password and need to pass security questions
userRouter.post("/forgetPassword", ensureAuthorized, userController.forgetPassword);

// user reset password in the case they forgot
userRouter.post("/doChangeForgottenPassword", ensureAuthorized, userController.changeForgottenPassword);

// user change details
userRouter.post("/changeDetails", ensureAuthorized, userController.changeDetails);

//export the router
module.exports = userRouter;