const
    Factory = require('../persistence/factory'),
    daoCarritos = new Factory().bring('cart'),
    daoUsuarios = new Factory().bring('user'),
    { logError } = require('../utils/index.utils');

/*
 * Se necesita saber si el usuario posee un carrito 
 * asociado al momento de iniciar sesión. En caso
 * de no tenerlo, se creará uno
 */

const hasCart = async(sessionUser) => {
    try {
        const cart = await daoCarritos.getCartProducts(sessionUser.cart);
        return cart != null;
    } catch (error) {
        logError.error('No se pudo obtener el carrito ' + error)
    }
    return false;
}

const assignNewCart = async(sessionUser) => {
    const user = await daoUsuarios.getByUsername(sessionUser.username);
    user.cart = await daoCarritos.createCart(sessionUser.address);
    await daoUsuarios.updateUser(user);
}

module.exports = { hasCart, assignNewCart }