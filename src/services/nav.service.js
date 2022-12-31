const
    Factory = require('../persistence/factory'),
    daoCarritos = new Factory().bring('cart'),
    { logError } = require('../utils/logger-winston');

/*
 * Debido a que muchos controladores requieren la misma 
 * información para renderizar la barra de navegación,
 * se crea un método con el fin de no repetir líneas de 
 * código
 */
const navConfig = async(user) => {
    let filename = "",
        productsList = [],
        cartAmount = 0,
        cartId = -1;

    if (user) {
        cartId = user.cart;
        filename = user.profilePicture;

        try {
            productsList = await daoCarritos.getCartProducts(cartId);
            cartAmount = productsList.length;
        } catch (error) {
            logError.error('No se pudieron obtener los productos ' + error)
            productsList = 0;
        }
    }

    return { filename, productsList, cartAmount, cartId }
}

module.exports = { navConfig }