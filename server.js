//const mongoose = require("mongoose");

// import backend framwork
const express = require("express");
const session = require('express-session')
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const URL = require('url');

const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 5000;

// link to database
const db = require('./models/db.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "She could fade and wither - I didn't care.",
    name: "UserAccount",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 1,
        secure: false
    },
    store: MongoStore.create({ mongoUrl: "mongodb+srv://AEHXZ:aehxz123456@cluster0.0vlpa.mongodb.net/CRM?retryWrites=true&w=majority" }),
    rolling: true
}))


app.set("view engine", "ejs");

Ses = require("./models/session")

// link to routes 
const contactRouter = require("./routes/contactRouter");
const meetingRouter = require("./routes/meetingRouter");
const userRouter = require("./routes/userRouter");
const tagRouter = require("./routes/tagRouter")





// Interceptor
app.use(function (req, res, next) {
    let arr = req.url.split("/")
    console.log(arr)
    if (arr[2] === "profile" || arr[2] === "login" || arr[2] === "register" || arr[2] === "doRegister" || arr[2] === undefined) {
        console.log("white list")
        next()
    } else {
        var bearerHeader = req.headers["authorization"]
        
        if (!bearerHeader) {
            console.log("intercept")
            res.status(403).json({
                msg:"token expired"
            })
        }
        next()
    }

})


app.use("/api/contact", contactRouter);
app.use("/api/meeting", meetingRouter);
app.use("/api", userRouter);
app.use("/api/tag", tagRouter);

// 'default' route to catch user errors
app.all('*', (req, res) => {
    res.status(404).render('404')
})

//Indicating running backend
app.listen(port, () => {
    console.log(`App is running at ${port}`)
})


