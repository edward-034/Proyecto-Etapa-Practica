const service= require("./dashboard.service")
const alerts = require("../alertas/alertas.service")

async function dashboard(req,res){
    try{
        const data= await service.getDashboard()
        const alert= await alerts.generarAlertas()
        res.json(data)
    } catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports={
    dashboard
}