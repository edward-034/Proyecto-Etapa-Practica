const movimientos = require("./movimientos.model");
const medicamentos = require("../medicamentos/medicamentos.model");
const alertas = require("../alertas/alertas.model");
const db = require("../../config/db");

async function create(body, user) {
    const medicamento = await medicamentos.findById(body.id_medicamento);
    if (!medicamento) {
        throw new Error("Medicamento no existe");
    }

    let nuevoStock = medicamento.stock_actual;

    if (body.tipo_movimiento === "Entrada") {
        nuevoStock += body.cantidad;
    } else {
        if (body.cantidad > medicamento.stock_actual) {
            throw new Error("Stock insuficiente");
        }
        nuevoStock -= body.cantidad;
    }

    await movimientos.create({
        ...body,
        id_usuario: user.id
    });

    await medicamentos.updateStock(body.id_medicamento, nuevoStock);

    if (nuevoStock <= medicamento.stock_minimo) {
        await alertas.create({
            tipo: "Stock Bajo",
            descripcion: "Inventario crítico",
            id: body.id_medicamento
        });
    }

    return {
        mensaje: "Movimiento registrado",
        stock: nuevoStock
    };
}

async function getHistory({ page = 1, limit = 20, tipo = "", search = "" }) {
    const offset = (page - 1) * limit;
    const params = [];

    let sql = `
        SELECT 
            m.*, 
            med.nombre_comercial, 
            u.nombre_completo
        FROM movimientos m
        JOIN medicamentos med ON med.id_medicamento = m.id_medicamento
        JOIN usuarios u ON u.id_usuario = m.id_usuario
        WHERE m.deleted_at IS NULL
    `;

    if (tipo) {
        sql += ` AND m.tipo_movimiento = ?`;
        params.push(tipo);
    }

    if (search) {
        sql += `
            AND (
                med.nombre_comercial LIKE ? 
                OR m.numero_lote LIKE ?
            )
        `;
        params.push(`%${search}%`, `%${search}%`);
    }

    sql += `
        ORDER BY m.created_at DESC
        LIMIT ? 
        OFFSET ?
    `;
    params.push(Number(limit), Number(offset));

    const [rows] = await db.execute(sql, params);
    return rows;
}

async function getAll(){
    return await movimientos.getAll()
}

module.exports = {
    create,
    getHistory,
    getAll
};