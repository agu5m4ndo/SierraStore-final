const
    carritos = require('../../../data/models/carts'),
    Cart = require('../../classes/cart'),
    ContenedorMongoDB = require('../../containers/ContenedorMongoDB')
let instance;

class CarritosDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(carritos);
    }

    /*
     * Se encarga de settear el id de un carrito. Tiene en cuenta
     * que pueden existir carritos ocupando ids cuyo valor no 
     * corresponden con su posición en el array
     */
    async idSetter() {
        let amount = 1;
        let cart = " ";
        while (cart != null) {
            try {
                cart = await super.findOne({ id: `${amount}` });
                if (cart == null) break;
                amount++;
            } catch (error) {
                cart = null;
            }
        }
        return amount;
    }

    async createCart(address) {
        const newCart = new Cart();
        const id = await this.idSetter();
        const object = new carritos({
            timestamp: newCart.timestamp,
            id,
            deliveryLocation: address
        })
        await super.create(object)
        return object.id;
    }

    async getCartProducts(id) {
        const cart = await super.findOne({ id: `${id}` })
        return cart.products;
    }

    //Si el producto existe en el carrito, aumenta su cantidad, sino lo agrega
    async addToCart(id, product) {
        const cart = await super.findOne({ id: `${id}` });
        const index = cart.products.findIndex(prod => { return prod.code === product.code })
        if (index >= 0) {
            cart.products[index].amount += product.amount;
        } else {
            product.id = cart.products.length;
            cart.products.push(product);
        }
        return await super.update({ id: `${id}` }, cart)
    }

    //Elimina un producto del carrito y reasigna sus ids a los demás productos
    async removeFromCart(id, idProd) {
        const cart = await super.findOne({ id: `${id}` });
        if (cart.products[idProd]) {
            cart.products.splice(idProd, 1);
            let i = 0;
            cart.products.forEach((prod) => {
                prod.id = i;
                i++;
            });
        }
        return await super.update({ id: `${id}` }, cart)
    }

    async updateOneProduct(id, idProd, amount) {
        const cart = await super.findOne({ id: `${id}` });
        if (cart.products[idProd]) {
            cart.products[idProd].amount = amount;
        }
        return await super.update({ id: `${id}` }, cart)
    }

    async removeAllProducts(id) {
        const cart = await super.findOne({ id: `${id}` });
        cart.products = [];
        return await super.update({ id: `${id}` }, cart)
    }

    async deleteCart(id) {
        return await super.delete({ id: `${id}` });
    }

    static getInstance() {
        if (!instance) instance = new CarritosDaoMongo();
        return instance;
    }
}

module.exports = CarritosDaoMongo;