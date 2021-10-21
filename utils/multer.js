const multer = require('multer');
const path=require('path')
function uploadFile (req, res, next) {
    let fullPath = path.resolve("attachment");
    let filename = "";
    let storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,fullPath);
        },
        filename:(req,file,cb)=>{
            let extname = path.extname(file.originalname);
            filename=file.filename+"-"+Date.now()+extname;
            cb(null,filename);
        }
    })

    let upload = multer({storage}).single("file");
    upload(req, res, (err) => {
        if(err instanceof multer.MulterError) {
            res.send("multererr" + err);
        } else if (err){
            res.send("other err:"+ err)
        } else {
            req.body.file = req.file;
            next();
        }
    })
};

module.exports = {uploadFile}