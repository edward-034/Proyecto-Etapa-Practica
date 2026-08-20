const jwt= require("../utils/jwt")

function auth(req,res,next){
    try{
        const token= req.cookies.access_token
            if(!token){
                return res.status(401).json({
                    error: "No autorizado"
                })
            }
        const decoded= jwt.verifyToken(token)
        req.user=decoded
        next()
    } catch{
        return res.status(401).json({
            error: "Token inválido"
        })
    }
}

module.exports= auth