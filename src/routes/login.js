const
    express = require('express'),
    router = express.Router(),
    { authenticate } = require('../middleware/passport'),
    { getLoginView, loginAction } = require('../controllers/login'),
    { loginValidation } = require('../middleware/validator')

router.route('/').get(getLoginView).post(loginValidation, authenticate, loginAction);

module.exports = router;