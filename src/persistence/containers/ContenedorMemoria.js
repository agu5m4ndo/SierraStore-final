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
    }

    getAll() {
        return this.array;
    }

    findOne(type, value) {
        const index = this.array.findIndex((item) => { return item[type] == value })
        if (this.array[index]) return this.array[index];
        return null;
    }

    update(type, value, modifiedItem) {
        const index = this.array.findIndex(item => { return item[type] === value })
        if (this.array[index]) {
            this.array[index] = modifiedItem;
        }
    }

    findMultiple(value, possibleRequests) {
        const allCoincidences = [];
        for (let i = 0; i < possibleRequests.length; i++) {
            if (allCoincidences.length <= 0) {
                this.array.forEach(item => {
                    if (item[possibleRequests[i]] == value || item[possibleRequests[i]].includes(value)) {
                        allCoincidences.push(item)
                    }
                })
            }
        }
        return allCoincidences;
    }


    delete(type, value) {
        const index = this.array.findIndex(item => { return item[type] === value })
        if (this.array[index]) {
            this.array.splice(index, 1);
        }
    }
}

module.exports = ContenedorMemoria;