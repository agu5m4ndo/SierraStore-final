const
    express = require('express'),
    router = express.Router(),
    { logout } = require('../controllers/logout.js');

router.route('/').get(logout);

module.exports = router;