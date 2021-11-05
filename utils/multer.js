const multer = require('multer');
const path = require('path')
const fs = require("fs")
const DEFAULT_PATH = "attachment"

// upload file to server
function uploadFile(req, res, next) {
    fs.mkdir("attachment", (err) => {
        if (err) {
            console.log(err)
            return;
        }
    })
    let fullPath = path.resolve("attachment");
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, fullPath);
        },
        filename: (req, file, cb) => {
            let fname = file.originalname;
            req.body.filename = fname
            let extName = "";
            if (fname.lastIndexOf(".") != -1) {
                extName = fname.slice(fname.lastIndexOf("."));
            }
            cb(null, file.fieldname + '-' + Date.now() + extName);
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

// delete middle path of uploading file
function deleteMiddlePath() {
    try {
        deleteDir(DEFAULT_PATH)
    } catch (err) {
        console.log(err)
    }
}

// delete the path
function deleteDir(url) {
    var files = [];

    if (fs.existsSync(url)) {

        files = fs.readdirSync(url);
        files.forEach(function (file, index) {
            var curPath = path.join(url, file);

            if (fs.statSync(curPath).isDirectory()) {
                deleteDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }

        });

        fs.rmdirSync(url);
    } else {
        console.log("Error: path not exist!");
    }

}

module.exports = { uploadFile, deleteMiddlePath }