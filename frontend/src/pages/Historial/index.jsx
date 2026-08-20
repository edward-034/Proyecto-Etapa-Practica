import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getHistory } from "../../services/historial.api";

export default function Historial() {
    const [data, setData] = useState([]);

    async function load() {
        try {
            const res = await getHistory({ page: 1, limit: 20 });
            setData(res || []);
        } catch (error) {
            console.error("Error al cargar el historial:", error);
            setData([]);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <MainLayout>
            {/* Encabezado Principal */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Auditoría e Historial de Movimientos
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Registro cronológico de entradas, salidas y ajustes de stock en el inventario.
                    </p>
                </div>
            </div>

            {/* Tabla con Diseño Corporativo */}
            <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-4">Tipo</th>
                                <th scope="col" className="px-6 py-4">Medicamento</th>
                                <th scope="col" className="px-6 py-4 text-center">Cantidad</th>
                                <th scope="col" className="px-6 py-4">Número de Lote</th>
                                <th scope="col" className="px-6 py-4">Usuario Responsable</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-400 font-medium">
                                        No se registran movimientos en el historial.
                                    </td>
                                </tr>
                            ) : (
                                data.map((m) => (
                                    <tr 
                                        key={m.id_movimiento} 
                                        className="transition-colors hover:bg-gray-50/70 dark:hover:bg-gray-900/40"
                                    >
                                        {/* Badge dinámico para identificar tipo de movimiento */}
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide ${
                                                m.tipo_movimiento?.toLowerCase() === 'entrada'
                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                                                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                                            }`}>
                                                {m.tipo_movimiento}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {m.nombre_comercial}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-center font-mono text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            {m.cantidad} u.
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-mono text-xs tracking-wider text-gray-600 dark:text-gray-400">
                                            {m.numero_lote || "N/A"}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                                            {m.nombre_completo}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}