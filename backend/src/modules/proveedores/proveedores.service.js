const model = require("./proveedores.model");

async function create(body) {
    // Validar campos obligatorios
    if (!body.nit_proveedor || body.nit_proveedor.trim() === "") {
        throw new Error("El NIT del proveedor es obligatorio");
    }

    if (!body.nombre_empresa || body.nombre_empresa.trim() === "") {
        throw new Error("El nombre de la empresa es obligatorio");
    }

    // Verificar que el NIT no esté registrado
    const exists = await model.findByNit(body.nit_proveedor);

    if (exists) {
        throw new Error("Ya existe un proveedor registrado con ese NIT");
    }

    // Crear proveedor
    await model.create({
        nit_proveedor: body.nit_proveedor.trim(),
        nombre_empresa: body.nombre_empresa.trim(),
        contacto_nombre: body.contacto_nombre?.trim() || null,
        telefono: body.telefono?.trim() || null,
        email: body.email?.trim() || null,
        direccion: body.direccion?.trim() || null
    });

    return {
        mensaje: "Proveedor creado correctamente"
    };
}

async function update(id, body) {
    if (!body.nit_proveedor || body.nit_proveedor.trim() === "") {
        throw new Error("El NIT del proveedor es obligatorio");
    }

    if (!body.nombre_empresa || body.nombre_empresa.trim() === "") {
        throw new Error("El nombre de la empresa es obligatorio");
    }

    // Comprobar que el NIT no pertenezca a otro proveedor
    const exists = await model.findByNit(body.nit_proveedor);

    if (exists && Number(exists.id_proveedor) !== Number(id)) {
        throw new Error("Ya existe otro proveedor registrado con ese NIT");
    }

    await model.update(id, {
        nit_proveedor: body.nit_proveedor.trim(),
        nombre_empresa: body.nombre_empresa.trim(),
        contacto_nombre: body.contacto_nombre?.trim() || null,
        telefono: body.telefono?.trim() || null,
        email: body.email?.trim() || null,
        direccion: body.direccion?.trim() || null
    });

    return {
        mensaje: "Proveedor actualizado correctamente"
    };
}

async function remove(id) {
    const provider = await model.findById(id);

    if (!provider) {
        throw new Error("Proveedor no encontrado");
    }

    await model.deleteOne(id);

    return {
        mensaje: "Proveedor eliminado correctamente"
    };
}

async function getAll({ page = 1, limit = 10, search = "" }) {
    page = Number(page);
    limit = Number(limit);

    if (page < 1) {
        page = 1;
    }

    if (limit < 1) {
        limit = 10;
    }

    const offset = (page - 1) * limit;

    const result = await model.getAll(search, limit, offset);

    return {
        data: result.rows,
        total: result.total,
        pages: Math.ceil(result.total / limit),
        page,
        limit
    };
}

async function getById(id) {
    const provider = await model.findById(id);

    if (!provider) {
        throw new Error("Proveedor no encontrado");
    }

    return provider;
}

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById
};