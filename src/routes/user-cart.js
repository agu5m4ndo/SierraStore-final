const
    express = require('express'),
    router = express.Router(),
    { getCartView, success } = require('../controllers/cart'),
    { logged } = require('../middleware/auth')

router.route('/').get(logged, getCartView)
router.route('/success').get(logged, success);

module.exports = router;