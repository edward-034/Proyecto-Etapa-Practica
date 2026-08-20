const model = require("./auth.model");
const hash = require("../../utils/hash");
const jwt = require("../../utils/jwt");

async function register(body) {
    const exists = await model.findByEmail(body.correo);
    if (exists) {
        throw new Error("Usuario existe");
    }

    const encrypted = await hash.hashPassword(body.password);
    await model.createUser({
        ...body,
        password: encrypted
    });

    return {
        mensaje: "Usuario creado"
    };
}

async function login(correo, password) {
    const user = await model.findByEmail(correo);
    if (!user) {
        throw new Error("Credenciales inválidas");
    }

    const valid = await hash.comparePassword(password, user.contrasena);
    if (!valid) {
        throw new Error("Credenciales inválidas");
    }

    const token = jwt.generateToken(user);

    return {
        token,
        usuario: {
            id: user.id_usuario,
            nombre: user.nombre_completo,
            rol: user.rol
        }
    };
}

async function profile(user){
    return{
        id_usuario: user.id_usuario,
        correo: user.correo_electronico,
        rol: user.rol
    }
}

module.exports={
    login,
    register,
    profile
}