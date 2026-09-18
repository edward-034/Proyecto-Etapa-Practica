import { useEffect, useState } from "react";
import {
    createProveedor,
    updateProveedor
} from "../services/proveedores.api";

const initialForm = {
    nit_proveedor: "",
    nombre_empresa: "",
    contacto_nombre: "",
    telefono: "",
    email: "",
    direccion: ""
};

export default function ProveedorModal({
    isOpen,
    onClose,
    proveedor,
    onSaved
}) {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const editing = Boolean(proveedor);

    useEffect(() => {
        if (proveedor) {
            setForm({
                nit_proveedor: proveedor.nit_proveedor || "",
                nombre_empresa: proveedor.nombre_empresa || "",
                contacto_nombre: proveedor.contacto_nombre || "",
                telefono: proveedor.telefono || "",
                email: proveedor.email || "",
                direccion: proveedor.direccion || ""
            });
        } else {
            setForm(initialForm);
        }

        setError("");
    }, [proveedor, isOpen]);

    if (!isOpen) {
        return null;
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (!form.nit_proveedor.trim()) {
            setError("El NIT del proveedor es obligatorio");
            return;
        }

        if (!form.nombre_empresa.trim()) {
            setError("El nombre de la empresa es obligatorio");
            return;
        }

        try {
            setLoading(true);

            if (editing) {
                await updateProveedor(
                    proveedor.id_proveedor,
                    form
                );
            } else {
                await createProveedor(form);
            }

            await onSaved();

            onClose();

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.error ||
                "No fue posible guardar el proveedor"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {editing
                                ? "Editar proveedor"
                                : "Nuevo proveedor"}
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {editing
                                ? "Actualiza la información del proveedor"
                                : "Registra un nuevo proveedor en el sistema"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl transition"
                    >
                        ×
                    </button>

                </div>

                {/* Formulario */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5"
                >

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* NIT + Empresa */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-semibold mb-1.5">
                                NIT *
                            </label>

                            <input
                                type="text"
                                name="nit_proveedor"
                                value={form.nit_proveedor}
                                onChange={handleChange}
                                placeholder="Ej: 900123456-7"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1.5">
                                Nombre de la empresa *
                            </label>

                            <input
                                type="text"
                                name="nombre_empresa"
                                value={form.nombre_empresa}
                                onChange={handleChange}
                                placeholder="Ej: Distribuciones ABC S.A.S."
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                    </div>

                    {/* Contacto + Teléfono */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-semibold mb-1.5">
                                Nombre del contacto
                            </label>

                            <input
                                type="text"
                                name="contacto_nombre"
                                value={form.contacto_nombre}
                                onChange={handleChange}
                                placeholder="Ej: Juan Pérez"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1.5">
                                Teléfono
                            </label>

                            <input
                                type="text"
                                name="telefono"
                                value={form.telefono}
                                onChange={handleChange}
                                placeholder="Ej: 3001234567"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block text-sm font-semibold mb-1.5">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Ej: contacto@empresa.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Dirección */}
                    <div>
                        <label className="block text-sm font-semibold mb-1.5">
                            Dirección
                        </label>

                        <input
                            type="text"
                            name="direccion"
                            value={form.direccion}
                            onChange={handleChange}
                            placeholder="Ej: Calle 10 #20-30"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Guardando..."
                                : editing
                                    ? "Guardar cambios"
                                    : "Crear proveedor"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}