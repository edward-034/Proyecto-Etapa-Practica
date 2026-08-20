const router = require("express").Router();
const controller = require("./medicamentos.controller");
const auth = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");

router.post("/",auth,allowRoles(
    "Administrador",
    "Farmaceutico"
),controller.create);
router.delete("/:id",auth,allowRoles(
"Administrador"
),controller.remove)
router.put("/:id",auth,allowRoles(
    "Administrador",
    "Farmaceutico"
),controller.update);
router.get("/",auth,allowRoles(
    "Administrador",
    "Supervisor",
    "Farmaceutico",
    "Auxiliar"
),controller.getAll);
router.get("/excel",auth,controller.exportExcel);

module.exports = router;