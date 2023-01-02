const
    express = require('express'),
    router = express.Router(),
    { getHomeView } = require('../controllers/home'),
    { adminAddProductView } = require('../controllers/products'),
    { admin, logged } = require('../middleware/auth')

router.route('/').get(getHomeView);
router.route('/add-product').get(logged, admin, adminAddProductView)

module.exports = router;