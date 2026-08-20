import api from "./api";

export async function getUsuarios(page = 1, limit = 10, search = "") {
    const res = await api.get(
        `/usuarios?page=${page}&limit=${limit}&search=${search}`
    );
    return res.data;
}

export async function createUsuario(body) {
    const res = await api.post("/usuarios", body);
    return res.data;
}

export async function updateUsuario(id, body) {
    const res = await api.put(`/usuarios/${id}`, body);
    return res.data;
}

export async function deleteUsuario(id) {
    const res = await api.delete(`/usuarios/${id}`);
    return res.data;
}