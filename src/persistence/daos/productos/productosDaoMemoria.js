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
        const newProduct = new Product(name, description, code, thumbnail, price, stock, category);
        const object = Object.assign({}, newProduct);
        super.create(object);
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

    async updateProduct(product) {
        const newProduct = {
            name: product.name,
            description: product.description,
            code: product.code,
            thumbnail: product.thumbnail,
            price: product.price,
            stock: product.stock,
        }
        await super.update("code", product.code, newProduct)
    }

    getMultiple(query) {
        const array = ["name", "description", "category"]
        return super.findMultiple(query, array);
    }

    static getInstance() {
        if (!instance) instance = new ProductosDaoMemoria();
        return instance;
    }
}

module.exports = ProductosDaoMemoria;