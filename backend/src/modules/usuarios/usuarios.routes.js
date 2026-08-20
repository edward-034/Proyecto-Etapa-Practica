const router = require("express").Router();
const controller = require("./usuarios.controller");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

router.get("/",auth,role("Administrador"),controller.getAll);
router.post("/",auth,role("Administrador"),controller.create);
router.put("/:id",auth,role("Administrador"),controller.update);
router.delete("/:id",auth,role("Administrador"),controller.remove);

module.exports = router;