import { useEffect, useState } from "react";

export default function ThemeToggle() {
    // Leemos directamente del localStorage al inicializar el estado
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return (
        <button
            onClick={() => setDark((prev) => !prev)}
            className="mt-10 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 transition-colors duration-200"
        >
            {dark ? "☀ Modo claro" : "🌙 Modo oscuro"}
        </button>
    );
}