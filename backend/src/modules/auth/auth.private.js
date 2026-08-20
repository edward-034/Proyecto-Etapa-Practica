const router= require("express").Router()
const role= require("../../middlewares/role.middleware")

const auth= require("../../middlewares/auth.middleware")

router.get("/perfil",auth,(req,res)=>{
        res.json({
            usuario: req.user
        })
    }
)

router.get("/admin",auth,role("ADMIN"),(req,res)=>{
    res.json({
        mensaje: "Panel Admin"
    })
})

module.exports= router