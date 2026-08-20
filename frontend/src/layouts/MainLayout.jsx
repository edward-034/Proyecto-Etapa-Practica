import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
    return (
        <div className="flex bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-200">
            <Sidebar />
            <div className="flex-1 p-8 overflow-hidden">
                {children}
            </div>
        </div>
    );
}