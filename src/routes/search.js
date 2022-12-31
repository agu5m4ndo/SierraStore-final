const
    express = require('express'),
    router = express.Router(),
    { searchBarQueries } = require('../controllers/search');

router.route('/:query').get(searchBarQueries)

module.exports = router;