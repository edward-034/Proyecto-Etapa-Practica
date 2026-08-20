const model = require("./medicamentos.model");
const db = require("../../config/db");

async function create(body) {
    const required = [
        "nombre_comercial",
        "nombre_generico",
        "presentacion",
        "concentracion",
        "stock_actual",
        "stock_minimo",
        "precio_compra",
        "precio_venta"
    ];

    for (const field of required) {
        if (body[field] == null || body[field] === "") {
            throw new Error(`El campo "${field}" es obligatorio`);
        }
    }

    await model.create(body);

    return {
        mensaje: "Medicamento creado"
    };
}

async function remove(id) {
    await model.deleteOne(id);
}

async function update(id,body){
    return await model.update(id,body);
}

async function getAll({ page = 1, limit = 10, search = "" }) {
    const offset = (page - 1) * limit;

    const [rows] = await db.execute(`
        SELECT *
        FROM medicamentos
        WHERE deleted_at IS NULL
        AND (
            nombre_comercial LIKE ?
            OR nombre_generico LIKE ?
        )
        LIMIT ?
        OFFSET ?
    `, [
        `%${search}%`,
        `%${search}%`,
        Number(limit),
        Number(offset)
    ]);

    const [total] = await db.execute(`
        SELECT COUNT(*) total
        FROM medicamentos
        WHERE deleted_at IS NULL
        AND (
            nombre_comercial LIKE ?
            OR nombre_generico LIKE ?
        )
    `, [
        `%${search}%`,
        `%${search}%`
    ]);

    return {
        data: rows,
        total: total[0].total,
        pages: Math.ceil(total[0].total / limit)
    };
}

module.exports = {
    create,
    remove,
    update,
    getAll
};