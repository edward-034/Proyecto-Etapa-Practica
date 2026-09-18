const service = require("./proveedores.service");

// Crear proveedor
async function create(req, res) {
    try {
        const data = await service.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

// Actualizar proveedor
async function update(req, res) {
    try {
        const { id } = req.params;
        const data = await service.update(id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

// Eliminar proveedor
async function remove(req, res) {
    try {
        const { id } = req.params;
        const data = await service.remove(id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

// Obtener proveedores
async function getAll(req, res) {
    try {
        const {
            page = 1,
            limit = 10,
            search = ""
        } = req.query;

        const data = await service.getAll({
            page,
            limit,
            search
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

// Obtener proveedor por ID
async function getById(req, res) {
    try {
        const { id } = req.params;
        const data = await service.getById(id);
        res.json(data);
    } catch (error) {
        res.status(404).json({
            error: error.message
        });
    }
}

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById
};