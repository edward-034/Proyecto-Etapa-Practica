import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Modal from "../../components/Modal";
import MovimientoForm from "../../components/MovimientoForm";
import { getMovimientos, createMovimiento } from "../../services/movimientos.api";

export default function MovimientosPage() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    async function load() {
        try {
            const res = await getMovimientos();
            setData(res || []);
        } catch (error) {
            console.error("Error al cargar movimientos:", error);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function save(body) {
        try {
            console.log(body)
            await createMovimiento(body);
            setOpen(false);
            load();
        } catch (error) {
            console.error("Error al crear movimiento:", error);
            alert(error.response?.data?.error || "Error interno al registrar el movimiento");
        }
    }

    return (
        <MainLayout>
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Historial de Movimientos
                </h1>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                >
                    <span>＋</span> Registrar Flujo
                </button>
            </div>

            {/* Tabla de Historial */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700/50">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase border-b border-gray-100 dark:border-gray-700">
                            <th className="p-4">Tipo</th>
                            <th className="p-4">Medicamento</th>
                            <th className="p-4">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-300">
                        {data.length > 0 ? (
                            data.map((m) => (
                                <tr 
                                    key={m.id_movimiento} 
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                Dino>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                            m.tipo_movimiento === "Entrada" 
                                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" 
                                                : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                                        }`}>
                                            {m.tipo_movimiento === "Entrada" ? "📥 Entrada" : "📤 Salida"}
                                        </span>
                                    </td>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                                        {m.nombre_comercial}
                                    </td>
                                    <td className="p-4 font-mono font-semibold">
                                        {m.cantidad} uds
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-8 text-center text-gray-400 dark:text-gray-500">
                                    No se han registrado movimientos en la bitácora todavía.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Ventana Emergente del Formulario */}
            <Modal open={open} close={() => setOpen(false)}>
                <MovimientoForm submit={save} />
            </Modal>
        </MainLayout>
    );
}