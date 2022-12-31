const
    ContenedorFirebase = require('../../containers/ContenedorFirebase'),
    Cart = require('../../classes/cart');

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("carritos");
    }

    createCart() {
        const newCart = new Cart();
        const cartObject = {
            timestamp: newCart.timestamp,
            products: {}
        }
        super.create(cartObject);
    }

    getCartProducts(id) {
        return super.getById(id);
    }

    async addToCart(id, product) {
        //Obtengo el producto por su código, luego la lista de productos del carrito, lo meto y hago un update
        const productsList = await super.getById(id);
        const length = Object.keys(productsList.products).length;
        productsList.products[length] = product;
        return super.update(id, { products: productsList.products });
    }

    //Obtengo la lista de productos, consigo el índice del producto dentro de la lista, lo elimino y hago un update
    async removeFromCart(id, idProd) {
        const productsList = await super.getById(id);
        delete productsList.products[idProd];
        return super.update(id, { products: productsList.products });
    }

    deleteCart(id) {
        super.delete(id);
    }
}

module.exports = CarritosDaoFirebase;