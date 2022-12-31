const
    express = require('express'),
    router = express.Router(),
    { uploadAvatar } = require('../middleware/multer'),
    { getRegisterView, registerUser } = require('../controllers/register'),
    { registerValidation } = require('../middleware/validator');

router.route('/').get(getRegisterView).post(uploadAvatar.single('avatar'), registerValidation, registerUser);

module.exports = router;