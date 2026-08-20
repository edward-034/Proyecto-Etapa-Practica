const router= require("express").Router();
const controller= require("./dashboard.controller");
const auth= require("../../middlewares/auth.middleware");
const allowRoles= require("../../middlewares/role.middleware");

router.get("/",auth,allowRoles(
    "Administrador",
    "Supervisor",
    "Farmaceutico",
    "Auxiliar"
),controller.dashboard);
router.get("/health",(req,res)=>{
    res.json({api:"OK",database:"OK"})
});

module.exports= router