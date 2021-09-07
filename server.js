//const mongoose = require("mongoose");

// import backend framwork
const express = require("express");
const path = require("path");
const app = express();

const server = require("http").createServer(app);


app.use(express.urlencoded({extended:true}));
app.use(express.json());

// link to routes 
const contactRouter = require("./routes/contactRouter");
const meetingRouter = require("./routes/meetingRouter");
const userRouter = require("./routes/userRouter");



app.use("/contact", contactRouter);
app.use("/meeting", meetingRouter);
app.use("/", userRouter);

// 'default' route to catch user errors
app.all('*', (req, res) => {  
	res.status(404).render('404')
})

const port = process.env.PORT || 5000;
//Indicating running backend
app.listen(port, ()=> {
    console.log(`App is running at ${port}`)
})

module.exports = app;