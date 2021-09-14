//const mongoose = require("mongoose");

// import backend framwork
const express = require("express");
const session = require('express-session')
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');


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
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 2,
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

// Interceptor


app.use("/contact", contactRouter);
app.use("/meeting", meetingRouter);
app.use("/", userRouter);

// 'default' route to catch user errors
app.all('*', (req, res) => {
    res.status(404).render('404')
})

//Indicating running backend
app.listen(port, () => {
    console.log(`App is running at ${port}`)
})

exports.conflictLoginCheck = async function (req, res) {
    let strs = await Ses.find({}, async function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        return doc;
    });
    for (i = 0; i < strs.length; i++) {
        let keywords = strs[i].session.split(/"/);
        for (j = 0; j < keywords.length - 2; j++) {
            if (keywords[j] == "userid" && keywords[j + 2] == req.session.userid) {
                if (strs[i]._id == req.session.id) {
                    return false;
                } else {
                    Ses.findOneAndDelete({ _id: strs[i]._id }, function (err, doc) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    })
                    return true;


                }
            }
        }
    }
    return false;

}