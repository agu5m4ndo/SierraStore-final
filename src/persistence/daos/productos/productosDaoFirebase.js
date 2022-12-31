const ContenedorFirebase = require('../../containers/ContenedorFirebase');

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("productos");
    }

    createProduct(name, description, code, thumbnail, price, stock) {
        const newProduct = { name, description, code, thumbnail, price, stock };
        super.create(newProduct, code);
    }

    async getByCode(code) {
        const doc = this.query.doc(`${code}`);
        const item = await doc.get();
        const response = item.data();
        return response;
    }

    async deleteProduct(code) {
        let doc = this.query.doc(`${code}`);
        let item = doc.delete();
        return;
    }

    async update(product) {
        return super.update(product.code, product)
    }
}

module.exports = ProductosDaoFirebase;