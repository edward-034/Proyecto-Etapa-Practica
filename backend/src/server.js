require("dotenv").config()

const app=require("./app")
const db=require("./config/db")
const PORT=process.env.PORT
const COOKIE_SECURE= process.env.COOKIE_SECURE==="true"

async function start(){
    try{
        await db.getConnection()
        console.log(
            "BD conectada"
        )
        app.listen(PORT,()=>{
            console.log(`Servidor http://localhost:${PORT}`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()