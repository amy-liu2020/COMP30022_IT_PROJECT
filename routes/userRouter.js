const express = require("express");

const userRouter = express.Router();
var userRouter = require("../controller/userController");


// user login
userRouter.post("/login", userRouter.userLogin);

// new user registration
userRouter.post("/register", userRouter.userRegister);

// show user profile
userRouter.get("/profile", (req,res) =>
    userRouter.getProfile(req,res)
);

// user change password
userRouter.post("/changePassword", userRouter.changePassword);

// user change details
userRouter.post("/changeDetails", userRouter.changeDetails);
//export the router
module.exports = userRouter;