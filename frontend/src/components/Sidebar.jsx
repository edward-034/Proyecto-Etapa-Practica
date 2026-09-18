import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { logout } from "../services/auth.api";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/auth.store";

export default function Sidebar() {
    const nav= useNavigate();
    const user= useAuth(s=>s.user);
    const setUser= useAuth(s=>s.setUser);
    const hasRole = useAuth(s => s.hasRole);

    async function exit(){
        await logout()
        setUser(null)
        nav("/")
    }
    
    return (
        <div className="w-64 bg-white dark:bg-gray-950 border-r dark:border-gray-800 text-black dark:text-white p-6 transition">
            <h2 className="text-2xl font-bold">Jersalud</h2>
            
            <nav className="mt-10 flex flex-col gap-4">
                <NavLink to="/dashboard" className={({ isActive }) => `px-3 py-2 rounded transition-all ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                    Dashboard
                </NavLink>
                {hasRole(["Administrador", "Supervisor", "Farmaceutico"]) && (
                    <NavLink
                        to="/proveedores"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded transition-all ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`
                        }
                    >
                        Proveedores
                    </NavLink>
                )}
                <NavLink to="/medicamentos" className={({ isActive }) => `px-3 py-2 rounded transition-all ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                    Medicamentos
                </NavLink>
                <NavLink to="/movimientos" className={({ isActive }) => `px-3 py-2 rounded transition-all ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                    Movimientos
                </NavLink>
                {hasRole(["Administrador","Supervisor","Farmaceutico"]) && (
                <NavLink
                    to="/alertas"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded transition-all ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`
                    }
                >
                    Alertas
                </NavLink>
                )}
                {hasRole(["Administrador","Supervisor"]) && (
                <NavLink
                    to="/auditoria"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded transition-all ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`
                    }
                >
                    Auditoría
                </NavLink>
                )}
                <NavLink to="/historial" className={({ isActive }) => `px-3 py-2 rounded transition-all ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                    Historial
                </NavLink>
                {hasRole(["Administrador","Supervisor","Farmaceutico"]) && (
                <NavLink
                    to="/reportes"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded transition-all ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`
                    }
                >
                    Reportes
                </NavLink>
                )}
                {hasRole("Administrador") && (
                <NavLink
                    to="/usuarios"
                    className={({ isActive }) =>
                        `px-3 py-2 rounded transition-all ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`
                    }
                >
                    Usuarios
                </NavLink>
                )}
            </nav>
            <div className="mt-10">
                <ThemeToggle />
            </div>
            <div className="mt-10 p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 rounded-xl shadow-sm max-w-sm flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    {/* Información del Usuario */}
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Usuario Activo
                    </span>
                    <div className="text-sm font-medium text-gray-900 dark:text-white font-mono break-all">
                        {user?.correo}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    {/* Rol en el sistema */}
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Rol de Sistema
                    </span>
                    <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                            🛡️ {user?.rol}
                        </span>
                    </div>
                </div>

                <hr className="border-gray-100 dark:border-gray-700 my-1" />

                {/* Botón de Salida */}
                <button
                    onClick={exit}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 active:bg-red-200 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold text-sm py-2 px-4 rounded-lg transition-all duration-200 shadow-sm border border-red-100 dark:border-red-900/30"
                >
                    <span>🚪</span> Cerrar sesión
                </button>
            </div>
        </div>
        
    );
}