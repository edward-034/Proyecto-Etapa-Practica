import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getAlertas, atenderAlerta } from "../../services/alertas.api";

export default function Alertas() {
    const [alertas, setAlertas] = useState([]);

    async function load() {
        try {
            const data = await getAlertas();
            setAlertas(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function atender(id) {
        try {
            await atenderAlerta(id);
            await load();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainLayout>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 tracking-tight">
                Alertas del Sistema
            </h1>

            {alertas.length === 0 ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl dark:bg-green-950/30 dark:border-green-900/50 dark:text-green-400 font-medium">
                    ✨ No hay alertas activas en el inventario.
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {alertas.map((alerta) => (
                        <div 
                            key={alerta.id_alerta} 
                            className="border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl p-4 flex justify-between items-center shadow-sm"
                        >
                            <div className="flex flex-col gap-1">
                                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md w-fit ${
                                    alerta.tipo_alerta === 'Stock Bajo' 
                                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400' 
                                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-400'
                                }`}>
                                    {alerta.tipo_alerta}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm mt-1">
                                    {alerta.descripcion}
                                </p>
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    Medicamento: <strong className="text-gray-500 dark:text-gray-400">{alerta.nombre_comercial}</strong>
                                </span>
                            </div>

                            <button
                                onClick={() => atender(alerta.id_alerta)}
                                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-sm shadow-green-600/10 active:scale-95"
                            >
                                Atender
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </MainLayout>
    );
}