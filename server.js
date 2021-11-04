// import backend framwork
const express = require("express");
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

app.set("view engine", "ejs");

//Interceptor
const jwt = require('jsonwebtoken')
const User = require("./models/user")
app.use(function (req, res, next) {
    let arr = req.url.split("/")
    console.log(arr)
    if(arr[1] !== "api"){
        next()
    } else if (arr[2] === "profile" || arr[2] === "login" || arr[2] === "register" || arr[2] === "doRegister" || arr[2] === undefined) {
        console.log("white list")
        next()
    } else {

        var bearerHeader = req.headers.authorization
        
        if (!bearerHeader) {
            console.log("intercept")
            res.status(403).json({
                msg:"token expired"
            })
            return;
        }

        let token = bearerHeader.split(" ")[1]
        let decoded = jwt.decode(token, { complete: true })
        User.findOne({UserID:decoded.payload.userId},(err,data) => {
            if(err){
                res.status(400).json({
                    msg:"Error occur: " + err
                })
                return;
            }
            if(data.Token !== token) {
                console.log("You account have been login by others somewhere else")
                res.status(403).json({
                    msg:"You account have been login by others somewhere else"
                })
                return;
            }else{
                next()
            }
        })
        
    }
})


// link to routes 
const contactRouter = require("./routes/contactRouter");
const meetingRouter = require("./routes/meetingRouter");
const userRouter = require("./routes/userRouter");
const tagRouter = require("./routes/tagRouter");
const binRouter = require("./routes/binRouter");



app.use("/api/contact", contactRouter);
app.use("/api/meeting", meetingRouter);
app.use("/api", userRouter);
app.use("/api/tag", tagRouter);
app.use("/api/bin", binRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    console.log(req.url);
});

// 'default' route to catch user errors
app.all('*', (req, res) => {
    res.status(404).send('404')
})

//Indicating running backend
app.listen(port, () => {
    console.log(`App is running at ${port}`)
})


