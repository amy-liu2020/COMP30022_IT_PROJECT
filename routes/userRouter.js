const express = require("express");

const userRouter = express.Router();

const userController = require("../controller/userController.js");
const {ensureAuthorized} = require("../utils/token.js");
const {uploadFile, deleteMiddlePath} = require('../utils/multer.js')


// user login
userRouter.post("/login", (req, res) => {
    userController.doLogin(req, res)
});

// get preferred color setting of user
userRouter.get("/userPreferredColor", ensureAuthorized, (req, res)=>{
    userController.userPreferredColor(req, res)
});

// get security question during registration
userRouter.get("/register", (req, res) => {
    userController.getQuestionList(req, res)
});

// new user registration
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

// upload photo
userRouter.post("/upload", uploadFile, ensureAuthorized, (req, res) => {
    userController.savePhoto(req, res, deleteMiddlePath);
});

// change user preferred color setting
userRouter.post("/changeColor", ensureAuthorized, (req, res) => {
    userController.userChangePreferredColor(req, res)
});

// user change password
userRouter.post("/changePassword", ensureAuthorized, (req, res) => {
    userController.changePassword(req, res)
});

// user forget the password and need to pass security questions
userRouter.post("/forgetPassword", (req, res) => {
    userController.forgetPassword(req, res)
});

// user reset password in the case they forgot
userRouter.post("/doChangeForgottenPassword", (req, res) => {
    userController.changeForgottenPassword(req, res)
});

// user change details
userRouter.post("/changeDetails", ensureAuthorized, (req, res) => {
    userController.changeDetails(req, res)
});

//export the router
module.exports = userRouter;