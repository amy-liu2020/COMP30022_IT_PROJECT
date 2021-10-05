const jwt = require('jsonwebtoken')
function ensureAuthorized(req, res, next) {
    var bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        let token = bearerHeader.split(" ")[1]
        let decoded = jwt.decode(token, { complete: true })
        req.token = decoded.payload;
        next();
    } else {
        res.json({
            status:401,
            msg:"token expired"
        });
    }
}

module.exports = {ensureAuthorized}