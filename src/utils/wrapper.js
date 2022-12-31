/*
 * Encierra todas las peticiones del servidor dentro de una función
 * que captura los errores y los pasa a un handler específico
 */
module.exports = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);