import { useForm } from "react-hook-form";

export default function MedicamentoForm({ submit, initialData }) {
    const { register, handleSubmit } = useForm({defaultValues:initialData});

    return (
        <form 
            onSubmit={handleSubmit(submit)} 
            className="flex flex-col gap-4 w-full"
        >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Registrar Medicamento
            </h2>

            <div className="grid grid-cols-2 gap-3">
                <input
                    placeholder="Código de barras"
                    {...register("codigo_barras")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    placeholder="Nombre comercial"
                    {...register("nombre_comercial")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <input
                    placeholder="Nombre genérico"
                    {...register("nombre_generico")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    placeholder="Presentación (Ej: Tabletas)"
                    {...register("presentacion")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <input
                    placeholder="Concentración (Ej: 500mg)"
                    {...register("concentracion")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    placeholder="Stock actual"
                    {...register("stock_actual")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <input
                    type="number"
                    step="0.01"
                    placeholder="Precio compra"
                    {...register("precio_compra")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Precio venta"
                    {...register("precio_venta")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <input
                    type="number"
                    placeholder="Stock mínimo"
                    {...register("stock_minimo")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
                <input
                    type="number"
                    placeholder="ID Proveedor"
                    {...register("id_proveedor")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
            </div>
            <button 
                type="submit"
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
            >
                Guardar Medicamento
            </button>
        </form>
    );
}