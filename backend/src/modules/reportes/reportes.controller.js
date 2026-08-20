const service = require("./reportes.service");

async function excel(req, res) {
    try {
        const wb = await service.movimientosExcel();

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="jersalud_movimientos.xlsx"'
        );

        await wb.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function pdf(req, res) {
    try {
        const file = await service.exportPDF();
        res.download(file);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    excel,
    pdf
};