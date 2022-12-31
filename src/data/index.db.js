require('dotenv').config();
const
    ambient = process.env.AMBIENT,
    { connectMongoDb } = require('./config/mongodb')
let persistence;

//Se elige la persistencia a utilizar según el abmiente de desarrollo
const options = {
    prod: "MongoDb",
    dev: "Memory"
}

//Si el ambiente es prod, se inicia la conexión a MongoDB
if (options[ambient] == "prod") connectMongoDb();
persistence = options[ambient];

module.exports = persistence;