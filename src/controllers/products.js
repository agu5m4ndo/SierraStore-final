const
    Factory = require('../persistence/factory'),
    daoProductos = new Factory().bring('product'),
    { navConfig } = require('../services/nav.service')

const getOneProduct = async(req, res) => {
    const result = await daoProductos.getByCode(req.params['code']);
    res.status(200).json({ result });
}

const getAllProducts = async(req, res) => {
    return await daoProductos.getAll();
}

const postProduct = async(req, res) => {
    const { name, description, code, price, stock, category } = req.body;
    const thumbnail = req.file.filename;
    await daoProductos.createProduct(name, description, code, thumbnail, price, stock, category);
    res.status(201).json({ success: 'true' });
}

const editProduct = async(req, res) => {
    const { code, name, description, thumbnail, price, stock, category } = req.body
    const product = { code, name, description, thumbnail, price, stock, category }
    daoProductos.updateProduct(product);
    res.status(200).json({ success: 'true' });
}

const deleteProduct = async(req, res) => {
    await daoProductos.deleteProduct(req.params['code'])
    res.status(201).json({ success: 'true' })
}

//Renderiza la vista de un producto
const getProductView = async(req, res, next) => {
    const product = await daoProductos.getByCode(req.params['code']);
    if (product == null) {
        const error = new Error();
        error.status = 404;
        error.message = `No se encontró un producto con el código ${req.params['code']}`;
        error.options = 'Volver al inicio'
        error.redirection = '/'
        next(error)
    } else {
        const { date, monthNames } = require('../services/product.service')
        let { filename, cartAmount, cartId } = await navConfig(req.user);
        res.status(200).render('pages/product', { session: req.user, cartAmount, cartId, filename, product, futureDate: date, futureMonth: monthNames });
    }
}

//Renderiza la vista de administrador para agregar un producto
const adminAddProductView = (req, res) => {
    res.status(200).render('pages/addProduct', { validations: null })
}

module.exports = {
    getAllProducts,
    getOneProduct,
    postProduct,
    editProduct,
    deleteProduct,
    getProductView,
    adminAddProductView,
};