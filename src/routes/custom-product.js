const
    express = require('express'),
    router = express.Router(),
    { getProductView } = require('../controllers/products');

router.route('/:code').get(getProductView)

module.exports = router;