import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
    getUsuarios,
    deleteUsuario,
    updateUsuario,
    createUsuario
} from "../../services/usuarios.api";
import Modal from "../../components/Modal";
import UsuarioForm from "../../components/UsuarioForm";

export default function UsuariosPage() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    async function load() {
        try {
            const result = await getUsuarios(
                page,
                10,
                search
            );
            setItems(result.data);
            setPages(result.pages);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        load();
    }, [page, search]);

    async function remove(id) {
        if (!confirm("¿Eliminar usuario?"))
            return;
        await deleteUsuario(id);
        load();
    }

    async function save(body) {
        try {
            if (editing) {
                await updateUsuario(editing.id_usuario, body);
            } else {
                await createUsuario(body);
            }
            setOpen(false);
            setEditing(null);
            load();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <MainLayout>
            <h1 className="text-3xl font-bold mb-8">
                Usuarios
            </h1>
            <div className="flex justify-end mb-6">
                <button
                    onClick={()=>{
                        setEditing(null);
                        setOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                    Nuevo Usuario
                </button>
            </div>
            <input
                className="w-full border rounded-lg p-3 mb-6"
                placeholder="Buscar usuario..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="text-left p-3">Documento</th>
                            <th className="text-left p-3">Nombre</th>
                            <th className="text-left p-3">Correo</th>
                            <th className="text-left p-3">Rol</th>
                            <th className="text-left p-3">Estado</th>
                            <th className="text-center p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((user) => (
                            <tr
                                key={user.id_usuario}
                                className="border-t dark:border-gray-700"
                            >
                                <td className="p-3">
                                    {user.documento}
                                </td>
                                <td className="p-3">
                                    {user.nombre_completo}
                                </td>
                                <td className="p-3">
                                    {user.correo_electronico}
                                </td>
                                <td className="p-3">
                                    <span
                                        className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            ${
                                                user.rol === "Administrador"
                                                    ? "bg-red-100 text-red-700"
                                                : user.rol === "Supervisor"
                                                    ? "bg-blue-100 text-blue-700"
                                                : user.rol === "Farmaceutico"
                                                    ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }
                                        `}
                                    >
                                        {user.rol}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span
                                        className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            ${
                                                user.estado_usuario
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-200 text-gray-600"
                                            }
                                        `}
                                    >
                                        {user.estado_usuario
                                            ? "Activo"
                                            : "Inactivo"}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            onClick={()=>{
                                                setEditing(user);
                                                setOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => remove(user.id_usuario)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center gap-3 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="border rounded px-4 py-2 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="flex items-center">
                        Página {page} de {pages}
                    </span>
                    <button
                        disabled={page === pages}
                        onClick={() => setPage(page + 1)}
                        className="border rounded px-4 py-2 disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
            <Modal
                    open={open}
                    close={() => setOpen(false)}
                >
                <UsuarioForm
                    editing={editing}
                    onSubmit={save}
                />
            </Modal>
        </MainLayout>
    );
}