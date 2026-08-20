import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";
import Card from "../../components/Card";
import DashboardChart from "../../components/DashboardChart";

export default function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                const res = await api.get("/dashboard");
                setData(res.data);
            } catch (error) {
                console.error("Error al cargar datos del dashboard:", error);
            }
        }
        load();
    }, []);

    // Pantalla de carga integrada de forma nativa en el Layout
    if (!data) {
        return (
            <MainLayout>
                <div className="flex flex-col gap-2 animate-pulse">
                    <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* Título de Bienvenida */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 tracking-tight">
                Panel de Control Jersalud
            </h1>

            {/* Cuadrícula de Tarjetas de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                <Card title="Medicamentos" value={data.medicamentos} />
                <Card title="Stock bajo" value={data.stock_bajo} />
                <Card title="Entradas" value={data.entradas} />
                <Card title="Salidas" value={data.salidas} />
                <Card title="Por vencer" value={data.proximos_vencer} />
            </div>

            <div className="mt-8">
                <DashboardChart
                    entradas={data.entradas}
                    salidas={data.salidas}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Tarjeta de Stock Bajo */}
                <div className="bg-white dark:bg-gray-950 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
                    <div>
                        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                            <span className="text-lg">⚠️</span>
                            <h3 className="font-bold tracking-tight text-gray-900 dark:text-white text-base">
                                Medicamentos en Stock Bajo
                            </h3>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Requieren reabastecimiento urgente en inventario.
                        </p>
                    </div>
                    <p className="text-5xl font-extrabold tracking-tight mt-6 font-mono text-rose-600 dark:text-rose-400">
                        {data.stock_bajo || 0}
                    </p>
                </div>

                {/* Tarjeta de Próximos a Vencer */}
                <div className="bg-white dark:bg-gray-950 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
                    <div>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                            <span className="text-lg">📅</span>
                            <h3 className="font-bold tracking-tight text-gray-900 dark:text-white text-base">
                                Próximos a Vencer
                            </h3>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Lotes con fecha crítica de caducidad en auditoría.
                        </p>
                    </div>
                    <p className="text-5xl font-extrabold tracking-tight mt-6 font-mono text-amber-600 dark:text-amber-400">
                        {data.proximos_vencer || 0}
                    </p>
                </div>
            </div>

            {/* Banner de Estado General de Alerta */}
            <div className="mt-8 border border-gray-100 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
                {data.stock_bajo > 0 ? (
                    <div className="flex items-center gap-3 p-5 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400">
                        <span className="text-xl">⚠️</span>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">Alerta de Suministros</span>
                            <p className="text-xs opacity-90 mt-0.5">
                                Hay medicamentos que se encuentran por debajo del stock mínimo requerido. Revisa el listado para emitir reposiciones.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 p-5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400">
                        <span className="text-xl">✅</span>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">Inventario Estable</span>
                            <p className="text-xs opacity-90 mt-0.5">
                                Todos los niveles de stock cumplen con los parámetros operativos de seguridad.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}