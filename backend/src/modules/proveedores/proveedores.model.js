const db = require("../../config/db");

async function create(data) {
    return db.execute(
        `
        INSERT INTO proveedores
        (
            nit_proveedor,
            nombre_empresa,
            contacto_nombre,
            telefono,
            email,
            direccion
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            data.nit_proveedor,
            data.nombre_empresa,
            data.contacto_nombre ?? null,
            data.telefono ?? null,
            data.email ?? null,
            data.direccion ?? null
        ]
    );
}

async function update(id, data) {
    return db.execute(
        `
        UPDATE proveedores
        SET
            nit_proveedor = ?,
            nombre_empresa = ?,
            contacto_nombre = ?,
            telefono = ?,
            email = ?,
            direccion = ?
        WHERE id_proveedor = ?
        AND deleted_at IS NULL
        `,
        [
            data.nit_proveedor,
            data.nombre_empresa,
            data.contacto_nombre ?? null,
            data.telefono ?? null,
            data.email ?? null,
            data.direccion ?? null,
            id
        ]
    );
}

async function deleteOne(id) {
    return db.execute(
        `
        UPDATE proveedores
        SET deleted_at = NOW()
        WHERE id_proveedor = ?
        AND deleted_at IS NULL
        `,
        [id]
    );
}

async function findByNit(nit) {
    const [rows] = await db.execute(
        `
        SELECT *
        FROM proveedores
        WHERE nit_proveedor = ?
        AND deleted_at IS NULL
        `,
        [nit]
    );

    return rows[0];
}

async function findById(id) {
    const [rows] = await db.execute(
        `
        SELECT
            id_proveedor,
            nit_proveedor,
            nombre_empresa,
            contacto_nombre,
            telefono,
            email,
            direccion,
            created_at,
            updated_at
        FROM proveedores
        WHERE id_proveedor = ?
        AND deleted_at IS NULL
        `,
        [id]
    );

    return rows[0];
}

async function getAll(search = "", limit = 10, offset = 0) {
    const [rows] = await db.execute(
        `
        SELECT
            id_proveedor,
            nit_proveedor,
            nombre_empresa,
            contacto_nombre,
            telefono,
            email,
            direccion,
            created_at,
            updated_at
        FROM proveedores
        WHERE deleted_at IS NULL
        AND (
            nit_proveedor LIKE ?
            OR nombre_empresa LIKE ?
            OR contacto_nombre LIKE ?
            OR telefono LIKE ?
            OR email LIKE ?
        )
        ORDER BY id_proveedor DESC
        LIMIT ?
        OFFSET ?
        `,
        [
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,
            Number(limit),
            Number(offset)
        ]
    );

    const [count] = await db.execute(
        `
        SELECT COUNT(*) total
        FROM proveedores
        WHERE deleted_at IS NULL
        AND (
            nit_proveedor LIKE ?
            OR nombre_empresa LIKE ?
            OR contacto_nombre LIKE ?
            OR telefono LIKE ?
            OR email LIKE ?
        )
        `,
        [
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`
        ]
    );

    return {
        rows,
        total: count[0].total
    };
}

module.exports = {
    create,
    update,
    deleteOne,
    findByNit,
    findById,
    getAll
};