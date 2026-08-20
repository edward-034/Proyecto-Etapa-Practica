const ExcelJS = require("exceljs");
const db = require("../../config/db");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

async function movimientosExcel() {
    const [rows] = await db.execute(`
        SELECT
            m.id_movimiento,
            m.tipo_movimiento,
            med.nombre_comercial,
            m.cantidad,
            m.numero_lote,
            m.fecha_vencimiento,
            m.created_at
        FROM movimientos m
        JOIN medicamentos med ON med.id_medicamento = m.id_medicamento
        ORDER BY m.created_at DESC
    `);

    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Movimientos");

    ws.columns = [
        { header: "ID", key: "id_movimiento", width: 10 },
        { header: "Tipo", key: "tipo_movimiento", width: 15 },
        { header: "Medicamento", key: "nombre_comercial", width: 30 },
        { header: "Cantidad", key: "cantidad", width: 15 },
        { header: "Lote", key: "numero_lote", width: 20 },
        { header: "Vence", key: "fecha_vencimiento", width: 18 },
        { header: "Fecha", key: "created_at", width: 25 }
    ];

    rows.forEach(r => ws.addRow(r));

    return wb;
}

async function exportPDF() {
    const fileName = `JERSALUD_${Date.now()}.pdf`;
    const output = path.join("uploads", "pdf", fileName);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(output));

    // =====================
    // DATOS
    // =====================
    const [[meds]] = await db.execute(`
        SELECT COUNT(*) total FROM medicamentos WHERE deleted_at IS NULL
    `);

    const [[stock]] = await db.execute(`
        SELECT COUNT(*) total FROM medicamentos WHERE stock_actual <= stock_minimo
    `);

    const [[alertas]] = await db.execute(`
        SELECT COUNT(*) total FROM alertas WHERE estado_alerta = 'Activa'
    `);

    const [ultimos] = await db.execute(`
        SELECT tipo_movimiento, cantidad, numero_lote, created_at
        FROM movimientos
        ORDER BY created_at DESC
        LIMIT 8
    `);

    const [tabla] = await db.execute(`
        SELECT nombre_comercial, stock_actual, precio_venta
        FROM medicamentos
        LIMIT 15
    `);

    // =====================
    // PORTADA
    // =====================
    const logo = path.join("uploads", "logo-jersalud.png");
    if (fs.existsSync(logo)) {
        doc.image(logo, 210, 40, { width: 160 });
    }

    doc.moveDown(7);
    doc.fontSize(28).text("JERSALUD", { align: "center" });
    doc.fontSize(16).text("Sistema Farmacéutico", { align: "center" });
    doc.moveDown();
    doc.text(new Date().toLocaleString(), { align: "center" });
    doc.addPage();

    // =====================
    // RESUMEN
    // =====================
    doc.fontSize(20).text("Resumen Ejecutivo");
    doc.moveDown();
    doc.fontSize(12).text(
        "Este documento presenta el estado operativo del sistema farmacéutico.\n\nIncluye inventario, movimientos y alertas."
    );

    // =====================
    // INDICADORES
    // =====================
    doc.moveDown(2);
    doc.fontSize(16);
    doc.text(`Medicamentos: ${meds.total}`);
    doc.text(`Stock bajo: ${stock.total}`);
    doc.text(`Alertas: ${alertas.total}`);

    // =====================
    // TABLA
    // =====================
    doc.addPage();
    doc.fontSize(18).text("Inventario");
    doc.moveDown();
    tabla.forEach(m => {
        doc.text(`${m.nombre_comercial} | Stock: ${m.stock_actual} | $${m.precio_venta}`);
    });

    // =====================
    // MOVIMIENTOS
    // =====================
    doc.addPage();
    doc.fontSize(18).text("Movimientos");
    doc.moveDown();
    ultimos.forEach(m => {
        doc.text(`${m.tipo_movimiento} - ${m.cantidad} - ${m.numero_lote}`);
    });

    // =====================
    // QR
    // =====================
    const qr = await QRCode.toDataURL("http://localhost:5173");
    const qrData = qr.replace(/data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrData, "base64");

    doc.moveDown(4);
    doc.image(qrBuffer, 240, 550, { width: 100 });
    doc.moveDown(6);
    doc.text("Escanea para abrir Jersalud", { align: "center" });

    // =====================
    // FIRMA
    // =====================
    doc.moveDown(5);
    doc.text("___________________", { align: "right" });
    doc.text("Administrador", { align: "right" });

    doc.end();

    return new Promise(resolve => {
        setTimeout(() => resolve(output), 500);
    });
}

module.exports = {
    movimientosExcel,
    exportPDF
};