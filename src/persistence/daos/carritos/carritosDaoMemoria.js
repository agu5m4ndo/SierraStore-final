const
    ContenedorMemoria = require('../../containers/ContenedorMemoria'),
    Cart = require('../../classes/cart');
let instance;

class CarritosDaoMemoria extends ContenedorMemoria {

    constructor() {
        super();
    }

    /*
     * Se encarga de settear el id de un carrito. Tiene en cuenta
     * que pueden existir carritos ocupando ids cuyo valor no 
     * sea igual a su posición en el array
     */
    async idSetter() {
        let amount = 1;
        let cart = " ";
        while (cart != null) {
            try {
                cart = await super.getById(amount);
                if (cart == null) break;
                amount++;
            } catch (error) {
                cart = null;
            }
        }
        return amount;
    }

    createCart(address) {
        const newCart = new Cart();
        const id = this.idSetter();
        const cart = {
            timestamp: newCart.timestamp,
            id,
            deliveryLocation: address
        }
        super.create(cart);
        return id;
    }

    async getCartProducts(id) {
        return await super.findOne("id", id);
    }

    //Si existe el producto en el carrito, aumenta su cantidad, sino lo agrega
    async addToCart(id, product) {
        const cart = await super.findOne("id", id);
        const index = cart.productos.findIndex(prod => { return prod.code == product.code })
        if (index >= 0) cart.productos[index].amount = product.amount;
        else {
            product.id = cart.productos.length;
            cart.productos.push(product);
        }
        super.update("id", cart.id, cart);
    }

    //Elimina un producto del carrito y reasigna sus ids a los demás productos
    async removeFromCart(id, idProd) {
        const cart = await super.findOne("id", id);
        if (cart.productos[idProd]) {
            cart.productos.splice(idProd, 1);
            let i = 0;
            cart.productos.foreach((prod) => {
                prod.id = i;
                i++;
            })
        }
        super.update("id", id, cart)
    }

    async updateOneProduct(id, idProd, amount) {
        const cart = await super.findOne("id", id);
        if (cart.productos[idProd]) {
            cart.productos[idProd].amount = amount;
        }
        return await super.update("id", id, cart)
    }

    async removeAllProducts(id) {
        const cart = await super.findOne("id", id);
        cart.productos = [];
        super.update("id", id, cart)
    }

    deleteCart(id) {
        return super.delete("id", id);
    }

    static getInstance() {
        if (!instance) instance = new CarritosDaoMemoria();
        return instance;
    }
}

module.exports = CarritosDaoMemoria;