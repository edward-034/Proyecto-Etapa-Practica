const db = require("../../config/db");

async function create(data) {
    return db.execute(
        `
        INSERT INTO usuarios
        (
            documento,
            nombre_completo,
            correo_electronico,
            contrasena,
            rol,
            estado_usuario
        )
        VALUES (?,?,?,?,?,?)
        `,
        [
            data.documento,
            data.nombre_completo,
            data.correo_electronico,
            data.contrasena,
            data.rol,
            data.estado_usuario
        ]
    );
}

async function update(id, data) {
    return db.execute(
        `
        UPDATE usuarios
        SET
            documento=?,
            nombre_completo=?,
            correo_electronico=?,
            rol=?,
            estado_usuario=?
        WHERE id_usuario=?
        `,
        [
            data.documento,
            data.nombre_completo,
            data.correo_electronico,
            data.rol,
            data.estado_usuario,
            id
        ]
    );
}

async function deleteOne(id) {
    return db.execute(
        `
        UPDATE usuarios
        SET deleted_at=NOW()
        WHERE id_usuario=?
        `,
        [id]
    );
}

async function findByEmail(correo) {
    const [rows] = await db.execute(
        `
        SELECT *
        FROM usuarios
        WHERE correo_electronico=?
        `,
        [correo]
    );

    return rows[0];
}

async function getAll(search = "", limit = 10, offset = 0) {
    const [rows] = await db.execute(
        `
        SELECT
            id_usuario,
            documento,
            nombre_completo,
            correo_electronico,
            rol,
            estado_usuario
        FROM usuarios
        WHERE deleted_at IS NULL
        AND (
            documento LIKE ?
            OR nombre_completo LIKE ?
            OR correo_electronico LIKE ?
        )
        ORDER BY id_usuario DESC
        LIMIT ?
        OFFSET ?
        `,
        [
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
        FROM usuarios
        WHERE deleted_at IS NULL
        AND (
            documento LIKE ?
            OR nombre_completo LIKE ?
            OR correo_electronico LIKE ?
        )
        `,
        [
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
    findByEmail,
    getAll
};