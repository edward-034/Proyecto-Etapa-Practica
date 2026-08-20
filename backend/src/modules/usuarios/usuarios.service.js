const model = require("./usuarios.model");
const hash = require("../../utils/hash");

async function create(body) {
    body.correo_electronico = body.correo;
    body.contrasena = body.password;
    const exists = await model.findByEmail(body.correo_electronico);
    if (exists) {
        throw new Error("El correo ya existe");
    }
    body.contrasena = await hash.hashPassword(body.contrasena);
    body.estado_usuario ??= 1;
    await model.create(body);
    return {
        mensaje: "Usuario creado"
    };
}

async function update(id, body) {
    await model.update(id, body);
    return {
        mensaje: "Usuario actualizado"
    };
}

async function remove(id) {
    await model.deleteOne(id);
    return {
        mensaje: "Usuario eliminado"
    };
}

async function getAll({ page = 1, limit = 10, search = "" }) {
    const offset = (page - 1) * limit;
    const result = await model.getAll(search, limit, offset);
    return {
        data: result.rows,
        total: result.total,
        pages: Math.ceil(result.total / limit)
    };
}

module.exports = {
    create,
    update,
    remove,
    getAll
};