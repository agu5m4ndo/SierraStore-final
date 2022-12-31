const
    express = require('express'),
    router = express.Router(),
    { admin, logged } = require('../middleware/auth'),
    {
        getChatView,
        postMessage,
        getMessages
    } = require('../controllers/chat.js')

router.route('/').get(admin, getChatView).post(postMessage); //debería estar logged
router.route('/:email').get(getMessages) //acá también

module.exports = router;