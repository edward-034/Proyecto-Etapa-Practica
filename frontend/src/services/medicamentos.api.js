import api from "./api";

export async function getMedicamentos(page, search) {
    const res = await api.get("/medicamentos", {
        params: {
            page,
            limit: 10,
            search
        }
    });
    return res.data;
}

export async function createMedicamento(data) {
    const res = await api.post("/medicamentos", data);
    return res.data;
}

export async function deleteMedicamento(id) {
    const res = await api.delete(`/medicamentos/${id}`);
    return res.data;
}

export async function updateMedicamento(id,data){
    await api.put(`/medicamentos/${id}`,data);
}

export async function exportExcel() {
    const res = await api.get("/medicamentos/excel", {
        responseType: "blob"
    });
    return res.data;
}