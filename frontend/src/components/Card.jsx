export default function Card({ title, value }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-all duration-200 hover:shadow-md">
            <p className="text-gray-500 dark:text-gray-300 font-medium">
                {title}
            </p>
            <h2 className="text-4xl font-bold mt-2">
                {value}
                {
                    value>0 && title==="Stock bajo" &&
                    <p>
                        Revisar inventario
                    </p>
                }
            </h2>
        </div>
    );
}