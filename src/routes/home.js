const
    express = require('express'),
    router = express.Router(),
    { getHomeView } = require('../controllers/home'),
    { adminAddProductView } = require('../controllers/products'),
    { admin } = require('../middleware/auth')

router.route('/').get(getHomeView);
router.route('/add-product').get(admin, adminAddProductView)

module.exports = router;