const service= require("./movimientos.service")

async function create(req,res){
    try{
        const data= await service.create(req.body,req.user)
        res.status(201).json(data)
    } catch(error){
        res.status(400).json({
            error: error.message
        })
    }
}

async function history(req, res) {
    try {
        const data = await service.getHistory(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAll(req,res){
    const data=await service.getAll()
    res.json(data)
}

module.exports={
    create,
    history,
    getAll
}