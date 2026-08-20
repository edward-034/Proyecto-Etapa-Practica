const router = require("express").Router();
const controller = require("./alertas.controller");
const auth = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");

router.get("/",auth,allowRoles(
    "Administrador",
    "Supervisor",
    "Farmaceutico",
    "Auxiliar"
),controller.getAlertas);
router.put("/:id", auth, controller.atender);

module.exports = router;