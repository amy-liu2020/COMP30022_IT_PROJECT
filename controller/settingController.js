const Setting = require("../models/setting");

// send detail of setting 
const getSetting = async (req, res) => {
    try {
        const setting = await Setting.find().lean();
        res.json(setting);
    } catch (err){
        console.log(err);
    }
};

module.exports = getSetting