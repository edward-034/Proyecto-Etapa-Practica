import MainLayout from "../../layouts/MainLayout";

export default function Auditoria() {
    return (
        <MainLayout>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight">
                Auditoría
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Historial de acciones del sistema
            </p>
        </MainLayout>
    );
}