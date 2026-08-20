const model= require("./dashboard.model")

async function getDashboard(){
    return await model.metrics();
    const [porVencer] = await db.execute(`
        SELECT COUNT(*) AS total 
        FROM movimientos 
        WHERE deleted_at IS NULL AND fecha_vencimiento BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
    `);
}

module.exports={
    getDashboard
}