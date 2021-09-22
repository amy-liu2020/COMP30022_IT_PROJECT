const express = require("express");

const userRouter = express.Router();
var userController = require("../controller/userController.js");


// user login
userRouter.get("/", userController.userLogin);

userRouter.get("/conflict",userController.conflictLogin);

userRouter.post("/login", userController.doLogin);

// new user registration
userRouter.get("/register", userController.userRegister);

userRouter.post("/doRegister", userController.userDoRegister);

// show user profile
userRouter.get("/profile", (req,res) => {
    userController.getProfile(req,res)
});

// user change password
userRouter.post("/changePassword", userController.changePassword);

// user change details
userRouter.post("/changeDetails", userController.changeDetails);

//export the router
module.exports = userRouter;