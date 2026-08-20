const db = require("../../config/db");

async function generarAlertas() {
    await db.execute(`
        DELETE FROM alertas 
        WHERE estado_alerta='Activa'
    `);

    await db.execute(`
        INSERT INTO alertas(tipo_alerta, descripcion, id_medicamento)
        SELECT 'Stock Bajo', CONCAT(nombre_comercial, ' tiene stock bajo'), id_medicamento
        FROM medicamentos
        WHERE stock_actual<=stock_minimo
    `);

    await db.execute(`
        INSERT INTO alertas(tipo_alerta, descripcion, id_medicamento)
        SELECT 'Proximo a Vencer', CONCAT(med.nombre_comercial, ' vence pronto'), med.id_medicamento
        FROM movimientos mov
        JOIN medicamentos med ON med.id_medicamento = mov.id_medicamento
        WHERE mov.fecha_vencimiento BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
    `);
}

async function getAll() {
    const [rows] = await db.execute(`
        SELECT a.id_alerta, a.tipo_alerta, a.descripcion, a.created_at, m.nombre_comercial
        FROM alertas a
        LEFT JOIN medicamentos m ON a.id_medicamento = m.id_medicamento
        WHERE a.estado_alerta='Activa'
        ORDER BY a.created_at DESC
    `);
    return rows;
}

async function atender(id) {
    await db.execute(
        `UPDATE alertas SET estado_alerta='Atendida' WHERE id_alerta=?`,
        [id]
    );
}

module.exports = {
    generarAlertas,
    getAll,
    atender
};