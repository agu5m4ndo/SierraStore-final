const
    productos = require('../../../data/models/products'),
    ContenedorMongoDB = require('../../containers/ContenedorMongoDB'),
    { logError } = require('../../../utils/index.utils'),
    { queryBuilder } = require('../../../services/product.service')
let instance;

class ProductoDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(productos);
    }

    async createProduct(name, description, code, thumbnail, price, stock, category) {
        const object = new productos({
            name,
            description,
            code,
            thumbnail,
            price,
            stock,
            category
        })
        await super.create(object)
    }

    async getByCode(code) {
        let product = await super.findOne({ code: `${code}` });
        return product.toObject();
    }

    async deleteProduct(code) {
        await super.delete({ code: `${code}` });
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
        await super.update({ code: `${product.code}` }, { newProduct })
    }

    async getMultiple(value) {
        const query = queryBuilder(value);
        return await super.findMultiple(query);
    }

    static getInstance() {
        if (!instance) instance = new ProductoDaoMongo();
        return instance;
    }
}

module.exports = ProductoDaoMongo;