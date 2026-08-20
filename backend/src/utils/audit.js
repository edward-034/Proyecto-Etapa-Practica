const db = require("../config/db");

async function save(usuario, accion, tabla_afectada) {
    await db.execute(
        "INSERT INTO auditoria (usuario, accion, tabla_afectada) VALUES (?, ?, ?)",
        [usuario, accion, tabla_afectada]
    );
}

module.exports = {
    save
};