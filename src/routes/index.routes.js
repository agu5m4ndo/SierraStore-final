const
    express = require('express'),
    router = express.Router();

const
    cart = require('./cart'),
    product = require('./products'),
    home = require('./home'),
    login = require('./login'),
    logout = require('./logout'),
    register = require('./register'),
    customProduct = require('./custom-product'),
    userCart = require('./user-cart.js'),
    profile = require('./profile'),
    search = require('./search'),
    chat = require('./chat')

router.use('/api/productos', product);
router.use('/api/carrito', cart);
router.use('/', home);
router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/producto', customProduct);
router.use('/carrito', userCart);
router.use('/perfil', profile);
router.use('/search', search);
router.use('/chat', chat);

module.exports = router;