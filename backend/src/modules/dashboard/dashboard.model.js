const db = require("../../config/db");

async function metrics() {
    const [[medicamentos]] = await db.execute(`
        SELECT COUNT(*) AS total 
        FROM medicamentos 
        WHERE deleted_at IS NULL
    `);

    const [[stockBajo]] = await db.execute(`
        SELECT COUNT(*) AS total 
        FROM medicamentos 
        WHERE stock_actual <= stock_minimo 
        AND deleted_at IS NULL
    `);

    const [[entradas]] = await db.execute(`
        SELECT COUNT(*) AS total 
        FROM movimientos 
        WHERE tipo_movimiento = 'Entrada'
    `);

    const [[salidas]] = await db.execute(`
        SELECT COUNT(*) AS total 
        FROM movimientos 
        WHERE tipo_movimiento = 'Salida'
    `);

    const [[vencidos]] = await db.execute(`
        SELECT COUNT(*) AS total 
        FROM movimientos 
        WHERE fecha_vencimiento <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
    `);

    return {
        medicamentos: medicamentos.total,
        stock_bajo: stockBajo.total,
        entradas: entradas.total,
        salidas: salidas.total,
        proximos_vencer: vencidos.total
    };
}

async function movementsMonth(){
    const [rows]= await db.execute(`SELECT MONTH(created_at) mes, COUNT(*) cantidad FROM movimientos GROUP BY mes`)
    return rows
}

module.exports = {
    metrics,
    movementsMonth
};