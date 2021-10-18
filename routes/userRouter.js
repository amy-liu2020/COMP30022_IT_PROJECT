const express = require("express");

const userRouter = express.Router();

const path=require('path')
const userController = require("../controller/userController.js");
const {ensureAuthorized} = require("../utils/token.js");
const {uploadFile} = require('../utils/multer.js')


// user login
userRouter.get("/", (req, res) => {
    userController.userLogin(req, res)
});

userRouter.post("/login", (req, res) => {
    userController.doLogin(req, res)
});

// new user registration
userRouter.get("/userPreferredColor", ensureAuthorized, (req, res)=>{
    userController.userPreferredColor(req, res)
});

userRouter.get("/register", (req, res) => {
    userController.getQuestionList(req, res)
});

userRouter.post("/doRegister", (req, res) => {
    userController.userDoRegister(req, res)
});

// show user profile
userRouter.get("/profile", ensureAuthorized, (req, res) => {
    userController.getProfile(req, res)
});

// get photo
userRouter.get("/getPhoto", ensureAuthorized, (req, res) => {
    userController.getPhoto(req, res)
});

userRouter.get("/uploadPhoto", (req,res)=>{
    res.render("userProfile",{})
})

userRouter.post("/upload", uploadFile, ensureAuthorized, (req, res) => {
    userController.savePhoto(req, res)
});

userRouter.post("/changeColor", ensureAuthorized, (req, res) => {
    userController.userChangePreferredColor(req, res)
});


// user change password
userRouter.post("/changePassword", ensureAuthorized, (req, res) => {
    userController.changePassword(req, res)
});

// user forget the password and need to pass security questions
userRouter.post("/forgetPassword", ensureAuthorized, (req, res) => {
    userController.forgetPassword(req, res)
});

// user reset password in the case they forgot
userRouter.post("/doChangeForgottenPassword", ensureAuthorized, (req, res) => {
    userController.changeForgottenPassword(req, res)
});

// user change details
userRouter.post("/changeDetails", ensureAuthorized, (req, res) => {
    userController.changeDetails(req, res)
});

//export the router
module.exports = userRouter;