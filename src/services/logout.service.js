const
    Factory = require('../persistence/factory'),
    daoCarritos = new Factory().bring('cart'),
    daoUsuarios = new Factory().bring('user'),
    { logWarn } = require('../utils/index.utils');

/*
 * El usuario es capaz de cerrar sesión sin perder su carrito.
 * Se revisa si el carrito está vacío. Si no lo está, no será
 * borrado
 */

const hasProducts = async(sessionUser) => {
    let noProducts = false;

    try {
        const containsProducts = await daoCarritos.getCartProducts(sessionUser.cart)
        if (containsProducts.length < 1) noProducts = true;
    } catch (error) {
        logWarn.warn('El carrito no contiene productos: ' + error);
        noProducts = true;
    }

    return noProducts
}

const cartRemoval = async(sessionUser, noProducts) => {
    if (noProducts) {
        await daoCarritos.deleteCart(sessionUser.cart);
        const user = await daoUsuarios.getByUsername(sessionUser.username);
        user.cart = -1;
        await daoUsuarios.updateUser(sessionUser.username, user);
    }
}

module.exports = { hasProducts, cartRemoval }