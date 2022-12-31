const { logError } = require('../../utils/logger-winston'), { connectMongoDb } = require('../../data/config/mongodb')

/*
 * Se utiliza identifier en algunos métodos para 
 * posibilitar el uso del contenedor con todos los objetos
 * y sus distintos identificadores
 */

class ContenedorMongo {
    constructor(model) {
        this.model = model;
        connectMongoDb();
    }

    async create(object) {
        try {
            //Es un objeto de mongoose
            await object.save()
        } catch (error) {
            logError.error('MongoDB error al crear un objeto ' + error)
        }
    }

    async getAll() {
        try {
            return await this.model.find({});
        } catch (error) {
            logError.error('MongoDB error al obtener todos los objetos ' + error)
        }
    }

    async findOne(identifier) {
        try {
            return await this.model.findOne(identifier);
        } catch (error) {
            logError.error('MongoDB error al obtener objeto por id ' + error)
        }
    }

    async findMultiple(identifier) {
        try {
            return await this.model.find(identifier);
        } catch (error) {
            logError.error('MongoDB error al obtener objeto por id ' + error)
        }
    }

    async update(identifier, newObject) {
        try {
            await this.model.replaceOne(identifier, newObject);
        } catch (error) {
            logError.error('MongoDB error actualizar un objeto ' + error)
        }
    }

    async delete(identifier) {
        try {
            await this.model.deleteOne(identifier)
        } catch (error) {
            logError.error('MongoDB error al eliminar un objeto ' + error)
        }
    }
}

module.exports = ContenedorMongo;