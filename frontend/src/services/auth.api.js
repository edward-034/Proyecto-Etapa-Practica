import api from "./api";

export async function login(body){
    const res = await api.post("/auth/login",body)
    return res.data
}

export async function profile() {
    const res = await api.get("/auth/profile");
    return res.data;
}

export async function logout() {
    const res = await api.post("/auth/logout");
    return res.data;
}