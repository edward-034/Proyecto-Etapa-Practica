import { create } from "zustand";

const useAuth = create((set, get) => ({

    // Usuario autenticado
    user: null,

    // Rol actual
    role: null,

    // Estado de autenticación
    authenticated: false,

    // Guardar usuario después del login
    setUser: (user) =>
        set({
            user,
            role: user?.rol ?? null,
            authenticated: true
        }),

    // Cerrar sesión
    logout: () =>
        set({
            user: null,
            role: null,
            authenticated: false
        }),

    // Consultar el rol
    hasRole: (roles) => {
        const role = get().role;

        if (!role) return false;

        if (Array.isArray(roles)) {
            return roles.includes(role);
        }

        return role === roles;
    }

}));

export default useAuth;