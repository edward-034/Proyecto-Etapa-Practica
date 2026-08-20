import api from "./api"

export async function getAlertas(){
    const res = await api.get("/alertas")
    return res.data
}

export async function atenderAlerta(id){
    await api.put(`/alertas/${id}`)
}