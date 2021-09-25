const Tag = require("../models/tag")

addTag = async function (req, res){
    try{
        let {tagName, tagOf} = req.body
        var decodedID = jwt.decode(req.token,{complete:true})
        let tagChecked = await Tag.find({TagName:tagName, TagOf:tagOf, AccountID:decodedID})
        if(!tagChecked){
            
            var newTag = new Tag({
                AccountID:decodedID,
                TagName:tagName,
                TagOf:tagOf
            })

            newTag.save((err) => {
                if (err) {
                    console.log(err)
                    return;
                }
            })
            res.json("success")
        }
    } catch (err) {
        console.log(err);
    }
}

deleteTag = async function(req, res){
    try{
        let{tagName, tagOf} = req.body
        var decodedID = jwt.decode(req.token,{complete:true})
        Tag.findOneAndDelete({TagName:tagName, TagOf:tagOf, AccountID:decodedID})

        res.json("success")
    }catch(err){
        console.log(err)
    }
}