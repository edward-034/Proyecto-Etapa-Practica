const router = require("express").Router();
const controller = require("./reportes.controller");
const auth = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");

router.get("/excel",auth,allowRoles(
    "Administrador",
    "Supervisor",
    "Farmaceutico"
),controller.excel);
router.get("/pdf",auth,allowRoles(
    "Administrador",
    "Supervisor",
    "Farmaceutico"
),controller.pdf);

module.exports = router;