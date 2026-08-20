import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function UsuarioForm({
    onSubmit,
    editing
}) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();
    useEffect(() => {
        if (editing) {
            reset({
                documento: editing.documento,
                nombre_completo: editing.nombre_completo,
                correo: editing.correo_electronico,
                rol: editing.rol,
                estado_usuario: editing.estado_usuario
            });
        } else {
            reset({
                documento: "",
                nombre_completo: "",
                correo: "",
                password: "",
                rol: "Auxiliar",
                estado_usuario: 1
            });
        }
    }, [editing]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-950 dark:text-gray-50">
            <div>
                <label className="block text-sm font-medium mb-1">Documento</label>
                <input
                    className="w-full border rounded p-2"
                    {...register("documento", {
                        required: "El documento es obligatorio",
                        minLength: {
                            value: 6,
                            message: "Mínimo 6 caracteres"
                        }
                    })}
                />
                {errors.documento && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.documento.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Nombre completo</label>
                <input
                    className="w-full border rounded p-2"
                    {...register("nombre_completo", {
                        required: "El nombre es obligatorio"
                    })}
                />

                {errors.nombre_completo && (
                    <p className="text-red-500 text-sm">
                        {errors.nombre_completo.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Correo</label>
                <input
                    className="w-full border rounded p-2"
                    {...register("correo_electronico", {
                        required: "Correo obligatorio",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Correo inválido"
                        }
                    })}
                />

                {errors.correo && (
                    <p className="text-red-500 text-sm">
                        {errors.correo.message}
                    </p>
                )}
            </div>

            {!editing && (
                <div>
                    <label className="block text-sm font-medium mb-1">Contraseña</label>
                    <input
                        type="password"
                        className="w-full border rounded p-2"
                        {...register("contrasena",{
                        required:"Contraseña obligatoria",
                        minLength:{
                        value:6,
                        message:"Mínimo 6 caracteres"
                        }
                        })}
                    />
                        {errors.password && (
                        <p className="text-red-500 text-sm">
                        {errors.password.message}
                        </p>
                    )}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium mb-1">Rol</label>
                <select
                    className="w-full border rounded p-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("rol")}
                >
                    <option value="Administrador">Administrador</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Farmaceutico">Farmacéutico</option>
                    <option value="Auxiliar">Auxiliar</option>
                </select>
            </div>

            {editing && (
                <div>
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <select
                        className="w-full border rounded p-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("estado_usuario")}
                    >
                        <option value={1}>Activo</option>
                        <option value={0}>Inactivo</option>
                    </select>
                </div>
            )}

            {/* Botones de Acción */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-50"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
}