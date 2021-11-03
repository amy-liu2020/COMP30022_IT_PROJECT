const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
    Palette: {
        Primary: {
            Main: {
                type:String,
                required:true
            },
            Darker: {
                type:String,
                required:true
            },
            Lighter: {
                type:String,
                required:true
            }
        },
        Secondary: {
            Main: {
                type:String,
                required:true
            },
            Darker: {
                type:String,
                required:true
            },
            Lighter: {
                type:String,
                required:true
            }
        }
    }
}, { versionKey: false });

var Bin = mongoose.model("theme", ThemeSchema, "ColorTheme");

module.exports = Bin
