import { Navigate } from "react-router-dom";
import useAuth from "../store/auth.store";

export default function ProtectedRoute({ children }) {
    const user = useAuth((s) => s.user);

    // Mientras la API verifica la cookie/token
    if (user === undefined) {
        return (
            <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 gap-3">
                {/* Spinner Animado */}
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-sans tracking-wide">
                    Verificando sesión...
                </p>
            </div>
        );
    }

    // Si la API confirmó que no hay sesión activa
    if (user === null) {
        return <Navigate to="/" replace />;
    }

    // Si hay sesión, da luz verde al componente privado
    return children;
}