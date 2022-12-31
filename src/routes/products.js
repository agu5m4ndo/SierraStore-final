const
    express = require('express'),
    router = express.Router(),
    {
        getOneProduct,
        getAllProducts,
        postProduct,
        deleteProduct,
        editProduct,
    } = require('../controllers/products'),
    { admin } = require('../middleware/auth'),
    { uploadProduct } = require('../middleware/multer')

router.route('/').get(getAllProducts).post(uploadProduct.single('thumbnail'), postProduct);
router.route('/:code').get(getOneProduct).delete(admin, deleteProduct).put(admin, editProduct);

module.exports = router;