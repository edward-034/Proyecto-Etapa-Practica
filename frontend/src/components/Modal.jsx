export default function Modal({ open, children, close }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[500px] shadow-2xl relative max-w-[90%]">
                
                <button 
                    onClick={close}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg transition-colors"
                >
                    ✕
                </button>

                <div className="mt-2">
                    {children}
                </div>

            </div>
        </div>
    );
}