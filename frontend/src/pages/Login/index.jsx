import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../store/auth.store";
import { login } from "../../services/auth.api";

export default function Login() {
    const { register, handleSubmit } = useForm();
    const nav = useNavigate();
    const setUser = useAuth((s) => s.setUser);

    async function submit(body) {
        try {
            const data = await login(body);
            setUser(data.usuario);
            nav("/dashboard");
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            alert(error.response?.data?.error || "Credenciales inválidas. Verifica tu correo y contraseña.");
        }
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-200">
            <form
                onSubmit={handleSubmit(submit)}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800/60 w-full max-w-[380px] flex flex-col"
            >
                {/* Branding / Título */}
                <div className="flex flex-col items-center mb-6 gap-1">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Farmacia Jersalud
                    </h1>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                        Gestión de Inventario y Bitácora
                    </p>
                </div>

                {/* Campo Correo */}
                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        placeholder="ejemplo@jersalud.com"
                        {...register("correo")}
                        className="w-full p-3 text-sm border rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all"
                    />
                </div>

                {/* Campo Contraseña */}
                <div className="flex flex-col gap-1 mb-6">
                    <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                        className="w-full p-3 text-sm border rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all"
                    />
                </div>

                {/* Botón de Ingreso */}
                <button
                    type="submit"
                    className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all shadow-sm shadow-blue-500/10 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                    Ingresar al Sistema
                </button>
            </form>
        </div>
    );
}