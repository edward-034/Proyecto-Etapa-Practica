import api from "./api";

export async function getHistory(params) {
    const res = await api.get("/movimientos/history", { params });
    return res.data;
}