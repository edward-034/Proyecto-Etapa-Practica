const service = require("./medicamentos.service");
const excel = require("../../utils/excel");
const audit = require("../../utils/audit");

async function create(req, res) {
    try {
        const data = await service.create(req.body);
        res.status(201).json(data);
        await audit.save(
            req.user.correo,
            "CREATE",
            "MEDICAMENTOS"
        )
        await audit.save(
            req.user.correo,
            "UPDATE",
            "MEDICAMENTOS"
        )
        await audit.save(
            req.user.correo,
            "DELETE",
            "MEDICAMENTOS"
        )
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

async function remove(req, res) {
    await service.remove(req.params.id);
    res.json({
        mensaje: "Eliminado"
    });
}

async function update(req, res) {
    try {
        await service.update(req.params.id, req.body);
        
        res.json({
            message: "Medicamento actualizado con éxito"
        });
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
        res.status(500).json({ error: error.message });
    }
}

async function exportExcel(req, res) {
    try {
        const data = await service.getAll();
        const workbook = await excel.exportMedicamentos(data);

        // Cabeceras HTTP oficiales y seguras para archivos Excel (.xlsx)
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=medicamentos.xlsx"
        );

        // Transmisión del archivo directamente al flujo de respuesta
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error al exportar el archivo de Excel:", error);
        res.status(500).json({ error: "No se pudo generar el reporte de inventario." });
    }
}

module.exports = {
    create,
    remove,
    update,
    getAll,
    exportExcel
};