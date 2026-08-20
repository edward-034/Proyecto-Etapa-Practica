import { useForm } from "react-hook-form";

export default function MovimientoForm({ submit }) {
    const { register, handleSubmit } = useForm();

    return (
        <form 
            onSubmit={handleSubmit(submit)} 
            className="flex flex-col gap-4 w-full"
        >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Registrar Movimiento de Inventario
            </h2>

            {/* Tipo de Movimiento */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Tipo de Movimiento
                </label>
                <select
                    {...register("tipo_movimiento")}
                    className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                >
                    <option value="Entrada">📥 Entrada</option>
                    <option value="Salida">📤 Salida</option>
                </select>
            </div>

            {/* Cantidad e ID Medicamento */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        placeholder="Ej: 50"
                        {...register("cantidad")}
                        className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        ID Medicamento
                    </label>
                    <input
                        type="number"
                        placeholder="Ej: 12"
                        {...register("id_medicamento")}
                        className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Lote y Fecha de Vencimiento */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        Número de Lote
                    </label>
                    <input
                        placeholder="Ej: LOT-2026"
                        {...register("numero_lote")}
                        className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        Fecha de Vencimiento
                    </label>
                    <input
                        type="date"
                        {...register("fecha_vencimiento")}
                        className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            <button 
                type="submit"
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
            >
                Guardar Movimiento
            </button>
        </form>
    );
}