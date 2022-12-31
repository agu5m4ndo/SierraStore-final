const
    express = require('express'),
    router = express.Router(),
    { getProfileView, editProfile } = require('../controllers/profile.js'),
    { logged } = require('../middleware/auth'),
    { uploadAvatar } = require('../middleware/multer'),
    { profileValidation } = require('../middleware/validator')

router.route('/').get(logged, getProfileView).post(logged, uploadAvatar.single('avatar'), profileValidation, editProfile)

module.exports = router;