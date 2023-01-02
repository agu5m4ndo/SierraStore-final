const
    Factory = require('../persistence/factory'),
    daoCarritos = new Factory().bring('cart'),
    daoProductos = new Factory().bring('product'),
    daoUsuarios = new Factory().bring('user'),
    { navConfig } = require('../services/nav.service'),
    { logError } = require('../utils/index.utils'),
    { addingCosts, completedPurchase } = require('../services/cart.service')

const createCart = async(req, res) => {
    const user = await daoUsuarios.getByUsername(req.user.username);
    user.cart = await daoCarritos.createCart(req.user.address);
    await daoUsuarios.updateUser(req.user, user);
    return newCartId;
}

const deleteCart = async(req, res) => {
    await deleteCartFunction(Number(req.params['id']));
    res.status(204).json({ success: 'true' })
}

const getCartProducts = async(req, res) => {
    let list;

    try {
        list = await daoCarritos.getCartProducts(Number(req.params['id']));
    } catch (error) {
        logError.error('No se pudieron obtener los productos ' + error)
    }

    res.status(200).json({ result: list });
}

const addToCart = async(req, res) => {
    let product = await daoProductos.getByCode(req.params['prod_code']);
    product.amount = Number(req.body['amount']);
    await daoCarritos.addToCart(Number(req.params['id']), product);
    res.status(200).json({ success: 'true' });
}

const removeFromCart = async(req, res) => {
    await daoCarritos.removeFromCart(Number(req.params['id']), Number(req.params['prod_code']));
    res.status(200).json({ success: 'true' });
}

const updateProductList = async(req, res) => {
    await daoCarritos.updateOneProduct(Number(req.params['id']), Number(req.params['prod_code']), Number(req.body['amount']))
    res.status(200).json({ sucess: 'true' });
}

//Renderiza la vista del carrito
const getCartView = async(req, res) => {
    const { filename, cartAmount, productsList, cartId } = await navConfig(req.user);
    const { totalAmount, shipmentTotalAmount } = addingCosts(productsList);
    return res.status(200).render('pages/cart', { session: req.user, filename, cartAmount, cartId, productsList, totalAmount, shipmentTotalAmount })
}

//Acciones luego de la compra de un producto 
const success = async(req, res) => {
    completedPurchase(req.user);
    res.render('pages/confirmedPurchase')
}

module.exports = {
    createCart,
    deleteCart,
    getCartProducts,
    addToCart,
    removeFromCart,
    getCartView,
    updateProductList,
    success
};