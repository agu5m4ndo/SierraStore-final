const
    express = require('express'),
    router = express.Router(),
    {
        createCart,
        deleteCart,
        getCartProducts,
        addToCart,
        removeFromCart,
        updateProductList
    } = require('../controllers/cart'),
    { logged, admin } = require('../middleware/auth')

router.route('/').post(createCart);
router.route('/:id').delete(admin, deleteCart);
router.route('/:id/productos').get(logged, getCartProducts);
router.route('/:id/productos/:prod_code').delete(removeFromCart).post(logged, addToCart).put(updateProductList);

module.exports = router;