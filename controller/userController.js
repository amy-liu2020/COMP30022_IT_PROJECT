

exports.userLogin = function (req, res){
    res.render("login", {});
};
exports.doLogin = function (req, res){
    res.send("login");
};
exports.userRegister = function (req, res){
    res.send("Register")
    console.log("Register")
};
exports.getProfile = function (req, res){
    res.send("Profile")
    console.log("Profile")
};
exports.changePassword = function (req, res){
    res.send("Password")
    console.log("Password")
};
exports.changeDetails = function (req, res){
    res.send("Details")
    console.log("Details")
};