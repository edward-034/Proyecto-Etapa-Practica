const service = require("./alertas.service");

async function getAlertas(req, res) {
    try {
        await service.generarAlertas();
        const data = await service.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atender(req, res) {
    try {
        await service.atender(req.params.id);
        res.json({ message: "Alerta atendida" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAlertas,
    atender
};