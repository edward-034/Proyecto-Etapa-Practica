import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function DashboardChart({ entradas, salidas }) {
    const data = {
        labels: ["Entradas", "Salidas"],
        datasets: [
            {
                label: "Cantidad de Medicamentos",
                data: [entradas, salidas],
                backgroundColor: [
                    "rgba(16, 185, 129, 0.2)", // Verde esmeralda sutil para Entradas
                    "rgba(245, 158, 11, 0.2)"   // Ámbar sutil para Salidas
                ],
                borderColor: [
                    "rgb(16, 185, 129)",        // Borde Verde esmeralda sólido
                    "rgb(245, 158, 11)"         // Borde Ámbar sólido
                ],
                borderWidth: 1.5,
                borderRadius: 6 // Bordes ligeramente redondeados para las barras (Estilo moderno)
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite que se adapte mejor al contenedor
        plugins: {
            legend: {
                display: false // Ocultamos la leyenda superior porque las etiquetas de abajo ya dicen qué es
            },
            tooltip: {
                backgroundColor: "rgba(15, 23, 42, 0.9)", // Fondo oscuro elegante para el tooltip
                titleFont: { size: 13, weight: "bold" },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 8
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(156, 163, 175, 0.1)" // Líneas de guía muy tenues
                }
            },
            x: {
                grid: {
                    display: false // Quitamos las líneas verticales de fondo para diseño más limpio
                }
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-950 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm transition-all">
            <div className="mb-4">
                <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    Balance General de Movimientos
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Comparativa total de stock ingresado vs despachado.
                </p>
            </div>
            <div className="h-64"> {/* Contenedor de altura fija para que Chart.js no se deforme */}
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}