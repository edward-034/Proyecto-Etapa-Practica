const service= require("./auth.service")
const logger = require("../../utils/logger")

async function register(req,res){
    try{
        const data=await service.register(req.body)
        res.status(201).json(data)
    } catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}

async function login(req,res){
    try{
        const data=await service.login(req.body.correo,req.body.password)
        res.cookie("access_token",data.token,
        {
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge: 15*60*1000
        }).json({usuario:data.usuario})
        logger.info({
            accion: "LOGIN",
            usuario: data.usuario.correo
        })
    } catch(error){
        res.status(401).json({
            error:error.message
        })
    }
}

async function profile(req,res){
    try{
        const data= await service.profile(req.user)
        res.json(data)
    } catch(error){
        res.status(401).json({
            error: error.message
        })
    }
}

async function logout(req,res){
    res.clearCookie("access_token").json({
        message: "Sesión cerrada"
    })
}

module.exports={
    register,
    login,
    profile,
    logout
}