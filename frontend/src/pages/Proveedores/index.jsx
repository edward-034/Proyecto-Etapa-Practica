import { useEffect, useState } from "react";
import {
    getProveedores,
    deleteProveedor
} from "../../services/proveedores.api";
import MainLayout from "../../layouts/MainLayout";
import ProveedorModal from "../../components/ProveedorModal";

export default function Proveedores() {
    const [proveedores, setProveedores] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Control del modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProveedor, setSelectedProveedor] = useState(null);

    const limit = 10;

    async function loadProveedores() {
        try {
            setLoading(true);
            setError("");

            const response = await getProveedores({
                page,
                limit,
                search
            });

            setProveedores(response.data || []);
            setTotal(response.total || 0);
            setPages(response.pages || 0);

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.error ||
                "No fue posible cargar los proveedores"
            );

            setProveedores([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProveedores();
    }, [page, search]);

    function handleSearch(event) {
        setSearch(event.target.value);
        setPage(1);
    }

    function handleNew() {
        setSelectedProveedor(null);
        setModalOpen(true);
    }

    function handleEdit(proveedor) {
        setSelectedProveedor(proveedor);
        setModalOpen(true);
    }

    function handleCloseModal() {
        setModalOpen(false);
        setSelectedProveedor(null);
    }

    async function handleSaved() {
        await loadProveedores();
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "¿Está seguro de eliminar este proveedor?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteProveedor(id);

            await loadProveedores();

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.error ||
                "No fue posible eliminar el proveedor"
            );
        }
    }

    return (
        <MainLayout>
            <div className="space-y-6">

                {/* Encabezado */}
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Proveedores
                        </h1>

                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Gestión de proveedores de Jersalud
                        </p>
                    </div>

                    <button
                        onClick={handleNew}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
                    >
                        + Nuevo proveedor
                    </button>

                </div>

                {/* Barra de búsqueda */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">

                    <div className="flex items-center justify-between gap-4">

                        <div className="relative flex-1 max-w-xl">

                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Buscar por NIT, empresa, contacto, teléfono o correo..."
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total:{" "}
                            <span className="font-semibold">
                                {total}
                            </span>
                        </div>

                    </div>

                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Tabla */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">

                    {loading ? (

                        <div className="p-10 text-center text-gray-500">
                            Cargando proveedores...
                        </div>

                    ) : proveedores.length === 0 ? (

                        <div className="p-10 text-center">

                            <p className="text-gray-500 dark:text-gray-400">
                                No se encontraron proveedores.
                            </p>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-50 dark:bg-gray-900/50">

                                    <tr>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                            NIT
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                            Empresa
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                            Contacto
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                            Teléfono
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                            Correo
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                            Dirección
                                        </th>

                                        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                                            Acciones
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                                    {proveedores.map((proveedor) => (

                                        <tr
                                            key={proveedor.id_proveedor}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                                        >

                                            <td className="px-6 py-4 font-medium">
                                                {proveedor.nit_proveedor}
                                            </td>

                                            <td className="px-6 py-4">
                                                {proveedor.nombre_empresa}
                                            </td>

                                            <td className="px-6 py-4">
                                                {proveedor.contacto_nombre || "—"}
                                            </td>

                                            <td className="px-6 py-4">
                                                {proveedor.telefono || "—"}
                                            </td>

                                            <td className="px-6 py-4">
                                                {proveedor.email || "—"}
                                            </td>

                                            <td className="px-6 py-4">
                                                {proveedor.direccion || "—"}
                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        onClick={() =>
                                                            handleEdit(proveedor)
                                                        }
                                                        className="px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition"
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                proveedor.id_proveedor
                                                            )
                                                        }
                                                        className="px-3 py-1.5 rounded-md bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50 transition"
                                                    >
                                                        Eliminar
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

                {/* Paginación */}
                {pages > 1 && (

                    <div className="flex items-center justify-between">

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Página {page} de {pages}
                        </p>

                        <div className="flex gap-2">

                            <button
                                disabled={page <= 1}
                                onClick={() =>
                                    setPage((current) => current - 1)
                                }
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                Anterior
                            </button>

                            <button
                                disabled={page >= pages}
                                onClick={() =>
                                    setPage((current) => current + 1)
                                }
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                Siguiente
                            </button>

                        </div>

                    </div>

                )}

                {/* Modal */}
                <ProveedorModal
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    proveedor={selectedProveedor}
                    onSaved={handleSaved}
                />

            </div>
        </MainLayout>
    );
}