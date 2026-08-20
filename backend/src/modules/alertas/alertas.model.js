const db= require("../../config/db")

async function create(data){
    await db.execute(`
        INSERT INTO alertas(
        tipo_alerta,
        descripcion,
        id_medicamento
        ) VALUES(?,?,?)
        `,
        [
            data.tipo,
            data.descripcion,
            data.id
        ]
    );
}

module.exports={
    create
}