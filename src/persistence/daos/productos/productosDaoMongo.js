const
    productos = require('../../../data/models/products'),
    ContenedorMongoDB = require('../../containers/ContenedorMongoDB'),
    { logError } = require('../../../utils/index.utils')
let instance;

class ProductoDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(productos);
    }

    async createProduct(name, description, code, thumbnail, price, stock, category) {
        const exists = await this.getByCode(code);
        if (exists == null) {
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
        } else {
            logError.error(`Ya existe un producto con ese código`);
        }
    }

    async getByCode(code) {
        return await super.findOne({ code: `${code}` });
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

    static getInstance() {
        if (!instance) instance = new ProductoDaoMongo();
        return instance;
    }
}

module.exports = ProductoDaoMongo;