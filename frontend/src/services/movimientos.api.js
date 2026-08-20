import api from "./api";

export async function getMovimientos() {
    const res = await api.get("/movimientos");
    return res.data;
}

export async function createMovimiento(data) {
    const res = await api.post("/movimientos", data);
    return res.data;
}