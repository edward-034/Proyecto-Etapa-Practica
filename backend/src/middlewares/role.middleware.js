function allowRoles(...rolesPermitidos) {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                error: "Usuario no autenticado"
            });
        }

        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({
                error: "No tienes permisos para acceder a este recurso"
            });
        }

        next();
    };

}

module.exports = allowRoles;