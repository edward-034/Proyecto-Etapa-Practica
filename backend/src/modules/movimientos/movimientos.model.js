const db = require("../../config/db");

async function create(data) {
    const [result] = await db.execute(
        `
        INSERT INTO movimientos (
            tipo_movimiento,
            cantidad,
            numero_lote,
            fecha_vencimiento,
            observaciones,
            id_medicamento,
            id_usuario
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            data.tipo_movimiento,
            data.cantidad,
            data.numero_lote,
            data.fecha_vencimiento,
            data.observaciones,
            data.id_medicamento,
            data.id_usuario
        ]
    );
    return result;
}

async function getAll() {
    const [rows] = await db.execute(
        `SELECT 
            m.*, 
            med.nombre_comercial 
        FROM movimientos m 
        INNER JOIN medicamentos med 
            ON med.id_medicamento = m.id_medicamento 
        WHERE m.deleted_at IS NULL 
        ORDER BY m.created_at DESC`
    );
    return rows;
}

module.exports = {
    create,
    getAll
};