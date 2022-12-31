const { toAdminPurchaseMail, toUserPurchaseMail, textMessageTwilio, logError } = require('../utils/index.utils'),
    orders = require('../data/models/orders'),
    Factory = require('../persistence/factory'),
    daoCarritos = new Factory().bring('cart');

//Suma el total de los productos y el costo de envío
const addingCosts = (productsList) => {
    let totalAmount = 0,
        shipmentTotalAmount = 0

    if (productsList != null) {
        for (let i = 0; i < productsList.length; i++) {
            totalAmount += productsList[i].price * productsList[i].amount;
            shipmentTotalAmount += (productsList[i].price * productsList[i].amount) / 10;
        }
        totalAmount = Math.round(totalAmount * 100) / 100;
        shipmentTotalAmount = Math.round(shipmentTotalAmount * 100) / 100;
    }

    return { totalAmount, shipmentTotalAmount };
}

/*
 * Cuando se completa una compra, se eliminan los elementos del array, 
 * se envía un mensaje de texto notificando al comprador y se envía un mail
 * notificando al administrador
 */
const completedPurchase = async(sessionUser) => {
    try {
        const products = await daoCarritos.getCartProducts(sessionUser.cart);

        data = {
            name: sessionUser.name,

            username: sessionUser.username,
            products,
            // number: sessionUser.phoneNumber
        }

        createNewOrder(products, sessionUser);

        await daoCarritos.removeAllProducts(sessionUser.cart)
        await toAdminPurchaseMail(data);
        await toUserPurchaseMail(data);
        // await sendMessage(data) //Con esta línea habilito el envío de mensajes al usuario
    } catch (error) {
        logError.error('No se pudieron obtener los productos ' + error)
    }
}

const createNewOrder = async(products, user) => {
    let trimmedProducts = [];
    for (let i = 0; i < products.length; i++) {
        trimmedProducts.push({
            name: products[i].name,
            code: products[i].code,
            price: products[i].price,
            amount: products[i].amount
        })
    }

    const ahora = new Date();
    const formatedDate = ahora.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const allOrders = await orders.find({})

    const order = new orders({
        date: formatedDate,
        orderNumber: allOrders.length,
        items: trimmedProducts,
        state: 'generada',
        email: user.username
    })
    await order.save();
}

module.exports = { addingCosts, completedPurchase }