const
    ContenedorMemoria = require('../../containers/ContenedorMemoria'),
    Product = require('../../classes/product'),
    { populateArray } = require('../../../data/config/productsMemory'),
    { logError } = require('../../../utils/index.utils');
let instance;

class ProductosDaoMemoria extends ContenedorMemoria {

    constructor() {
        super();
        super.populate(populateArray()); //Coloca productos iniciales en el array
    }

    async createProduct(name, description, code, thumbnail, price, stock, category) {
        const exists = await this.getByCode(code)
        console.log(exists)
        if (exists == null) {
            const newProduct = new Product(name, description, code, thumbnail, price, stock, category);
            const object = Object.assign({}, newProduct);
            super.create(object);
        } else {
            logError.error(`Ya existe un producto con ese código`);
        }
    }

    async getByCode(code) {
        return await super.findOne("code", code);
    }

    updateProduct(changedProduct) {
        super.update("code", changedProduct.code, changedProduct);
    }

    deleteProduct(code) {
        super.delete("code", code);
    }

    static getInstance() {
        if (!instance) instance = new ProductosDaoMemoria();
        return instance;
    }
}

module.exports = ProductosDaoMemoria;