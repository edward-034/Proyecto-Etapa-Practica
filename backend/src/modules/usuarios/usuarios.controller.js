const service = require("./usuarios.service");

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

async function update(req, res) {
    try {
        const data = await service.update(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

async function remove(req, res) {
    try {
        const data = await service.remove(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

async function getAll(req, res) {
    try {
        const data = await service.getAll(req.query);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

module.exports = {
    create,
    update,
    remove,
    getAll
};