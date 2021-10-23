const multer = require('multer');
const path = require('path')
const fs = require("fs")
const DEFAULT_PATH = "attachment"

function uploadFile(req, res, next) {
    fs.mkdir("attachment", (err) => {
        if(err){
            console.log(err)
            return;
        }
    })
    let fullPath = path.resolve("attachment");
    let filename = "";
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, fullPath);
        },
        filename: (req, file, cb) => {
            filename = "image.png";
            cb(null, filename);
        }
    })

    let upload = multer({ storage }).single("file");
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.send("Multer err: " + err);
        } else if (err) {
            res.send("Other err: " + err)
        } else {
            req.body.file = req.file;
            next();
        }
    })

};


function deleteMiddlePath(){
    try{
        deleteDir(DEFAULT_PATH)
    } catch (err) {
        console.log(err)
    }
}

function deleteDir(url){
    var files = [];
        
    if( fs.existsSync(url) ) {
           
        files = fs.readdirSync(url);   
        files.forEach(function(file,index){
            var curPath = path.join(url,file);
                
            if(fs.statSync(curPath).isDirectory()) { 
                deleteDir(curPath);
            } else {    
                fs.unlinkSync(curPath);
            }
                
        });
           
        fs.rmdirSync(url);
    }else{
        console.log("Error: path not exist!");
    }

}

module.exports = { uploadFile, deleteMiddlePath }