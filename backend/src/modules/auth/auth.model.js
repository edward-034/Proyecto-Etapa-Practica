const db=
require("../../config/db")

async function findByEmail(correo){
    const [rows]= await db.execute(`
        SELECT * FROM usuarios WHERE correo_electronico=? AND deleted_at IS NULL`,
        [correo]
    )
    return rows[0]
}

async function createUser(data){
    const [result]= await db.execute(`
        INSERT INTO usuarios(
            documento,
            nombre_completo,
            rol,
            correo_electronico,
            contrasena
        )
        VALUES(?,?,?,?,?)`,
        [
            data.documento,
            data.nombre,
            data.rol,
            data.correo,
            data.password
        ]
    )
    return result
}

module.exports={
    findByEmail,
    createUser
}