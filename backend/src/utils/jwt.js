const jwt=require("jsonwebtoken")

function generateToken(user){
    return jwt.sign({
        id:user.id_usuario,
        rol:user.rol,
        email:user.correo_electronico
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRES
    })
}

function verifyToken(token){
    return jwt.verify(token,process.env.JWT_SECRET)
}

module.exports={
    generateToken,
    verifyToken
}