function allowRoles(...roles) {
    // Aplana el array por si envías allowRoles(["Admin", "Supervisor"]) o allowRoles("Admin", "Supervisor")
    const rolesPermitidos = roles.flat().map(r => String(r).toLowerCase());

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: "Usuario no autenticado"
            });
        }

        // Extrae el rol sin importar si viene como req.user.rol o req.user.role
        const userRole = String(req.user.rol || req.user.role || "").toLowerCase();

        if (!rolesPermitidos.includes(userRole)) {
            return res.status(403).json({
                error: "No tienes permisos para acceder a este recurso"
            });
        }

        next();
    };
}

module.exports = allowRoles;