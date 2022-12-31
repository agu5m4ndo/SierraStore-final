const { logError } = require('../utils/index.utils'), { authenticateToken } = require('./jwt');

//Autoriza al usuario si su rol es 'admin'
const admin = (req, res, next) => {
    if (req.user.role == "admin") {
        return next();
    }
    const error = new Error();
    error.status = 401;
    error.message = 'No tienes permiso para acceder a esta página';
    error.options = 'Volver al inicio';
    error.redirection = '/';
    next(error);
}

//Autoriza al usuario si está logueado
const logged = (req, res, next) => {
    try {
        if (!!req.user) {
            next();
        } else {
            const error = new Error()
            error.status = 401;
            error.message = 'No tienes permiso para acceder a esta página';
            error.options = 'Inicia sesión';
            error.redirection = '/login';
            next(error);
        }
    } catch (err) {
        logError.error("User is not logged " + err);
    }
}

module.exports = { admin, logged }