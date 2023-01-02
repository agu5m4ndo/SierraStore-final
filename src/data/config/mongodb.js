const
    mongoose = require('mongoose'),
    ambient = process.env.AMBIENT,
    { logError, loggerConsole } = require('../../utils/index.utils');
require('dotenv').config();

/*
 * Verifica que la conexión con Mongo esté activa.
 * Si no lo está, iniciará una nueva conexión
 */
const connectMongoDb = () => {
    if (mongoose.connection.readyState == 0 && ambient == "prod") {
        mongoose.connect(process.env.CONNECTION_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, db) => {
            if (err) return logError.error('Ocurrió un error al conectarse a la base de datos ' + error);
            loggerConsole.info('Base de datos conectada a través de MongoDb');
        })
    }
}


module.exports = { connectMongoDb };