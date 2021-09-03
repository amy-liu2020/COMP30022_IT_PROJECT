const mongoose = require("mongoose");

// import backend framwork
const express = require("express");
const path = require("path");
const app = express();

const server = require("http").createServer(app);


app.use(express.urlencoded({extended:true}));
app.use(express.json());



// run the port
server.listen(5000,()=> {
    console.log('App is running');
});

