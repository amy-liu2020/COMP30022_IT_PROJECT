const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
    palette: {
        primary: {
            main: {
                type:String,
                required:true
            },
            darker: {
                type:String,
                required:true
            },
            lighter: {
                type:String,
                required:true
            }
        },
        secondary: {
            main: {
                type:String,
                required:true
            },
            darker: {
                type:String,
                required:true
            },
            lighter: {
                type:String,
                required:true
            }
        }
    }
}, { versionKey: false });

var Bin = mongoose.model("theme", ThemeSchema, "ColorTheme");

module.exports = Bin
