const db = require("../../config/db");

async function create(data) {
    const [result] = await db.execute(
        `
        INSERT INTO medicamentos (
            codigo_barras,
            nombre_comercial,
            nombre_generico,
            presentacion,
            concentracion,
            stock_actual,
            stock_minimo,
            precio_compra,
            precio_venta,
            id_proveedor
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            data.codigo_barras,
            data.nombre_comercial,
            data.nombre_generico,
            data.presentacion,
            data.concentracion,
            data.stock_actual,
            data.stock_minimo,
            data.precio_compra,
            data.precio_venta,
            data.id_proveedor
        ]
    );
    return result;
}

async function getAll() {
    const [rows] = await db.execute(
        `
        SELECT *
        FROM medicamentos
        WHERE deleted_at IS NULL
        ORDER BY id_medicamento DESC
        `
    );
    return rows;
}

async function findById(id) {
    const [rows] = await db.execute(
        `
        SELECT *
        FROM medicamentos
        WHERE id_medicamento = ?
        AND deleted_at IS NULL
        `,
        [id]
    );
    return rows[0];
}

async function updateStock(id, stock) {
    await db.execute(
        `
        UPDATE medicamentos
        SET stock_actual = ?
        WHERE id_medicamento = ?
        `,
        [stock, id]
    );
}

async function deleteOne(id) {
    await db.execute(
        `
        UPDATE medicamentos
        SET deleted_at = NOW()
        WHERE id_medicamento = ?
        `,
        [id]
    );
}

async function update(id, data) {
    await db.execute(
        `UPDATE medicamentos 
        SET 
            codigo_barras = ?, 
            nombre_comercial = ?, 
            nombre_generico = ?, 
            presentacion = ?, 
            concentracion = ?, 
            stock_actual = ?, 
            stock_minimo = ?, 
            precio_compra = ?, 
            precio_venta = ?, 
            id_proveedor = ? 
        WHERE id_medicamento = ? 
            AND deleted_at IS NULL`,
        [
            data.codigo_barras,
            data.nombre_comercial,
            data.nombre_generico,
            data.presentacion,
            data.concentracion,
            data.stock_actual,
            data.stock_minimo,
            data.precio_compra,
            data.precio_venta,
            data.id_proveedor,
            id
        ]
    );
}

module.exports = {
    create,
    getAll,
    deleteOne,
    update,
    findById,
    updateStock
};