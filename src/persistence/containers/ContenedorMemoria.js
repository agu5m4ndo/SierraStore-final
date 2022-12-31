/*
 * Se utiliza type y value en algunos métodos para 
 * posibilitar el uso del contenedor con todos los objetos
 * y sus distintos identificadores
 */

class ContenedorMemoria {
    array = [];
    constructor() {}

    //permite cargar muchos objetos al array
    populate(objects) {
        objects.forEach((element) => { this.array.push(element) })
    }

    create(object) {
        this.array.push(object);
        console.log('El objeto ha sido añadido correctamente');
    }

    getAll() {
        try {
            return this.array;
        } catch (error) {
            console.log('Hubo un error al tratar de leer todos los objetos. ', error)
        }
    }

    findOne(type, value) {
        const index = this.array.findIndex((item) => { return item[type] == value })
        if (this.array[index]) return this.array[index];
        console.log(`No se ha encontrado un objeto con el id ${id}`);
        return null;
    }

    update(type, value, modifiedItem) {
        const index = this.array.findIndex(item => { return item[type] === value })
        if (this.array[index]) {
            this.array[index] = modifiedItem;
            console.log(`El objeto ha sido modificado correctamente`);
        } else console.log(`No se ha encontrado un objeto con el id ${id}`);
    }

    delete(type, value) {
        const index = this.array.findIndex(item => { return item[type] === value })
        if (this.array[index]) {
            this.array.splice(index, 1);
            console.log(`El objeto ha sido eliminado`)
        } else {
            console.log(`No se pudo eliminar al objeto con id ${id}`);
        }
    }
}

module.exports = ContenedorMemoria;