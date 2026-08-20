const express=require("express")
const cors=require("cors")
const helmet=require("helmet")
const cookieParser=require("cookie-parser")
const morgan=require("morgan")
const rateLimit=require("express-rate-limit")
const app=express()
const auth= require("./modules/auth/auth.routes")
const private= require("./modules/auth/auth.private")
const medicamentos= require("./modules/medicamentos/medicamentos.routes")
const movimientos= require("./modules/movimientos/movimientos.routes")
const dashboard= require("./modules/dashboard/dashboard.routes")
const alertas= require("./modules/alertas/alertas.routes")
const reportes= require("./modules/reportes/reportes.routes")
const usuarios= require("./modules/usuarios/usuarios.routes")

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(helmet());
app.use(morgan("dev"));
app.use(
    rateLimit({
        windowMs:15*60*1000,
        max:100
    })
);
app.use("/api/auth",auth);
app.use("/api",private);
app.use("/api/medicamentos",medicamentos);
app.use("/api/movimientos",movimientos);
app.use("/api/dashboard",dashboard);
app.use("/api/alertas",alertas);
app.use("/api/reportes",reportes);
app.use("/api/usuarios",usuarios);
app.get("/",(req,res)=>{
    res.json({mensaje:"Jersalud API"})
});

module.exports= app