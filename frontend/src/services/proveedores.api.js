import api from "./api";

export async function getProveedores(params = {}) {
    const response = await api.get("/proveedores", {
        params
    });

    return response.data;
}

export async function getProveedorById(id) {
    const response = await api.get(`/proveedores/${id}`);

    return response.data;
}

export async function createProveedor(data) {
    const response = await api.post("/proveedores", data);

    return response.data;
}

export async function updateProveedor(id, data) {
    const response = await api.put(`/proveedores/${id}`, data);

    return response.data;
}

export async function deleteProveedor(id) {
    const response = await api.delete(`/proveedores/${id}`);

    return response.data;
}