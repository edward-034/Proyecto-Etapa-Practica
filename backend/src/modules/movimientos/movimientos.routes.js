const router= require("express").Router();
const controller= require("./movimientos.controller");
const auth= require("../../middlewares/auth.middleware");
const allowRoles= require("../../middlewares/role.middleware");

router.get("/",auth,allowRoles(
    "Administrador",
    "Supervisor",
    "Farmaceutico",
    "Auxiliar"
),controller.getAll);
router.post("/",auth,allowRoles(
    "Administrador",
    "Supervisor",
    "Farmaceutico",
    "Auxiliar"
),controller.create);
router.get("/history",auth,allowRoles(
    "Administrador",
    "Supervisor",
    "Farmaceutico",
    "Auxiliar"
),controller.history);

module.exports= router;