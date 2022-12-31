const
    winston = require('winston'),
    path = require('path');

//logger en la consola
const loggerConsole = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'info', colorize: true }),
        new winston.transports.Console({ level: 'warn', colorize: true }),
        new winston.transports.Console({ level: 'error', colorize: true }),
    ]
})

//logger de warning. Almacenado en archivo warning.log
const logWarn = winston.createLogger({
    level: 'warn',
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'logs', 'warning.log'), level: 'warn', colorize: true }),
    ]
})

//logger de error. Almacenado en archivo error.log
const logError = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'logs', 'error.log'), level: 'error', colorize: true }),
    ]
})

module.exports = { loggerConsole, logWarn, logError };