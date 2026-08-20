const ExcelJS = require("exceljs");

async function exportMedicamentos(data) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Medicamentos");

    // Configuración de las columnas con sus claves de acceso
    sheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Nombre Comercial", key: "nombre", width: 30 },
        { header: "Stock Actual", key: "stock", width: 15 },
        { header: "Precio de Venta", key: "venta", width: 18 }
    ];

    // Mapeo seguro de las propiedades que vienen de la base de datos
    data.forEach((m) => {
        sheet.addRow({
            id: m.id_medicamento,
            nombre: m.nombre_comercial,
            stock: m.stock_actual,
            venta: m.precio_venta
        });
    });

    // Toque premium: Estilizar los encabezados (Fila 1)
    const headerRow = sheet.getRow(1);
    headerRow.font = { name: "Arial", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
    headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF1E3A8A" } // Azul oscuro corporativo (Equivalente al bg-blue-900)
    };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };

    return workbook;
}

module.exports = {
    exportMedicamentos
};