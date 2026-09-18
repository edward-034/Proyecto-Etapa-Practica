const express = require("express");
const controller= require("./proveedores.controller");
const auth= require("../../middlewares/auth.middleware");
const allowRoles= require("../../middlewares/role.middleware");

const router = express.Router();

// Consultar proveedores
router.get("/",auth,allowRoles(["Administrador", "Supervisor", "Farmaceutico"]),controller.getAll);

// Consultar un proveedor
router.get("/:id",auth,allowRoles(["Administrador", "Supervisor", "Farmaceutico"]),controller.getById);

// Crear proveedor
router.post("/",auth,allowRoles(["Administrador", "Supervisor"]),controller.create);

// Actualizar proveedor
router.put("/:id",auth,allowRoles(["Administrador", "Supervisor"]),controller.update);

// Eliminar proveedor
router.delete("/:id",auth,allowRoles(["Administrador"]),controller.remove);

module.exports = router;