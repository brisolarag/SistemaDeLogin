const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeaders = req.headers.authorization

    if (!authHeaders) {
        return res.status(401).json({
            error: true,
            msg:"Token no provided."
        })
    }


    // Bearer sodnasnfaisnlaidjaslidjalisdlaisn
    const parts = authHeaders.split(" ")
    if (parts.length !== 2) {
        return res.status(401).json({
            error:true,
            msg:"Invalid token type."
        })
    }

    const [scheme, token] = parts;
    if (scheme.indexOf("Bearer") !== 0) {
        return res.status(401).json({
            error:true,
            msg:"Token malformatted"
        })
    }

    return jwt.verify(token, authConfig.secret, (err, decoded) => {

        console.log(err)
        console.log(decoded)
            
        if (err) {
            return res.status(401).json({
                error:true,
                msg:"Token invalid/expired"
            })
        }

        req.userLogged = decoded;


        return next();
    })


}