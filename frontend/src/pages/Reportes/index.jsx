import MainLayout from "../../layouts/MainLayout";
import { downloadExcel, downloadPDF } from "../../services/reportes.api";

export default function Reportes() {
    return (
        <MainLayout>
            {/* Encabezado Principal */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Módulo de Reportes y Auditoría
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Genera y descarga informes detallados del estado actual del inventario y movimientos de mercancía.
                </p>
            </div>

            {/* Panel de Descarga */}
            <div className="max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    Historial Completo de Movimientos
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    Exporta todas las entradas, salidas y registros de lote directamente a un archivo de Microsoft Excel (.xlsx).
                </p>

                <button
                    onClick={downloadExcel}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                >
                    📊 Descargar Reporte en Excel
                </button>
                <button
                    onClick={downloadPDF}
                    className="inline-flex w-full items-center justify-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg mt-4 hover:bg-red-700 transition-colors"
                >
                    Descargar PDF
                </button>
            </div>
        </MainLayout>
    );
}