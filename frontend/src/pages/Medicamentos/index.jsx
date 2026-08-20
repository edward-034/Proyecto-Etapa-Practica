import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Modal from "../../components/Modal";
import MedicamentoForm from "../../components/MedicamentoForm";
import {
    getMedicamentos,
    createMedicamento,
    deleteMedicamento,
    updateMedicamento
} from "../../services/medicamentos.api";
import { exportExcel } from "../../services/medicamentos.api"

export default function MedicamentosPage() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    async function load() {
        try {
            const response = await getMedicamentos(page, search);
            // Como 'response' ya es el array directo con los medicamentos:
            setItems(response.data);
            setPages(response.pages); // Actualizamos el número de páginas según la respuesta del backend

            // Calculamos las páginas de forma dinámica según los elementos que lleguen
            const totalItems = response?.length || 0;
            setPages(Math.ceil(totalItems / 10) || 1);
            
        } catch (error) {
            console.log(error);
            setItems([]);
            setPages(1);
        }
    }

    // Volver a cargar cuando cambia la página o cuando el usuario escribe en el buscador
    useEffect(() => {
        load();
    }, [page, search]);

    async function save(body) {
        try {
            if (editing) {
                await updateMedicamento(editing.id_medicamento, body);
            } else {
                await createMedicamento(body);
            }
            setEditing(null);
            setOpen(false);
            load();
        } catch (error) {
            console.error("Error al procesar el medicamento:", error);
        }
    }

    async function remove(id) {
        if (window.confirm("¿Seguro que deseas eliminar este medicamento?")) {
            try {
                await deleteMedicamento(id);
                load();
            } catch (error) {
                console.error("Error al eliminar medicamento:", error);
            }
        }
    }

    async function download() {
        try {
            const blob = await exportExcel();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "medicamentos.xlsx";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el reporte en Excel:", error);
            alert("No se pudo descargar el archivo en este momento. Inténtalo de nuevo.");
        }
    }

    return (
        <MainLayout>
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Gestión de Medicamentos
                </h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { setEditing(null); setOpen(true); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm" 
                    >
                        <span>＋</span> Agregar
                    </button>
                    <button 
                        onClick={download} 
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                        <span>📊</span> Excel
                    </button>
                </div>
            </div>

            {/* Buscador */}
            <div className="mb-6">
                <input
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                    placeholder="Buscar medicamento..."
                    className="border rounded p-3 w-full bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-sm"
                />
            </div>

            {/* Tabla de Resultados */}
            <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-4">Nombre Comercial</th>
                                <th scope="col" className="px-6 py-4">Nombre Genérico</th>
                                <th scope="col" className="px-6 py-4 text-center">Stock Actual</th>
                                <th scope="col" className="px-6 py-4 text-right">Precio Venta</th>
                                <th scope="col" className="relative px-6 py-4"><span className="sr-only">Acciones</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-400 font-medium">
                                        No se encontraron medicamentos registrados.
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => (
                                    <tr 
                                        key={item.id_medicamento} 
                                        className="transition-colors hover:bg-gray-50/70 dark:hover:bg-gray-900/40"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {item.nombre_comercial}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-600 dark:text-gray-300">
                                            {item.nombre_generico}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-center font-mono text-sm">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                                item.stock_actual <= (item.stock_minimo || 10)
                                                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400'
                                                    : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                                            }`}>
                                                {item.stock_actual} u.
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right font-mono font-medium text-gray-900 dark:text-white">
                                            ${Number(item.precio_venta).toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <button 
                                                onClick={() => { setEditing(item); setOpen(true); }}
                                                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación corregida: fuera de la tabla, abajo del todo del contenedor principal */}
                <div className="flex gap-2 p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
                    {[...Array(pages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                page === i + 1 
                                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/10" 
                                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal de Registro */}
            <Modal open={open} close={() => setOpen(false)}>
                <MedicamentoForm
                    submit={save}
                    initialData={editing}
                />
            </Modal>
        </MainLayout>
    );
}