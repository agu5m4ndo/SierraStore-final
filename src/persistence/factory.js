const
    ProductosDaoMongo = require('./daos/productos/productosDaoMongo'),
    CarritosDaoMongo = require('./daos/carritos/carritosDaoMongo'),
    UsuariosDaoMongo = require('./daos/usuarios/usuariosDaoMongo'),
    ChatsDaoMongo = require('./daos/chats/chatsDaoMongo'),

    ProductosDaoMemoria = require('./daos/productos/productosDaoMemoria'),
    CarritosDaoMemoria = require('./daos/carritos/carritosDaoMemoria'),
    UsuariosDaoMemoria = require('./daos/usuarios/usuariosDaoMemoria.js'),
    persistence = require('../data/index.db');

/*
 * Puedo evitar el uso de un switch anidado almacenando
 * los valores requeridos en distintos objetos y accediendo 
 * a sus keys
 */

const mongoObjects = {
    product: ProductosDaoMongo.getInstance(),
    cart: CarritosDaoMongo.getInstance(),
    user: UsuariosDaoMongo.getInstance(),
    chat: ChatsDaoMongo.getInstance()
}

const memoryObjects = {
    product: ProductosDaoMemoria.getInstance(),
    cart: CarritosDaoMemoria.getInstance(),
    user: UsuariosDaoMongo.getInstance(),
    chat: ChatsDaoMongo.getInstance()
}

const persistenceSelector = {
    MongoDb: mongoObjects,
    Memory: memoryObjects
}

//Devuelve el dao del objeto solicitado en función del ambiente de desarrollo
class Factory {
    bring(element) {
        return persistenceSelector[persistence][element];
    }
}

module.exports = Factory;