const
    Factory = require('../persistence/factory'),
    daoProductos = new Factory().bring('product'),
    { navConfig } = require('../services/nav.service')

//Busca los términos requeridos en la barra de búsqueda
const searchBarQueries = async(req, res, next) => {
    const product = await daoProductos.getMultiple(req.params['query'])
    if (product.length == 0) {
        const error = new Error();
        error.status = 404;
        error.message = `No se encontraron resultados para "${req.params['query']}"`;
        error.options = 'Volver al inicio'
        error.redirection = '/'
        next(error)
    } else {
        let { filename, cartAmount, cartId } = await navConfig(req.user);
        res.status(200).render('pages/index', { product, session: req.user, cartAmount, cartId, filename })
    }
}

module.exports = { searchBarQueries }