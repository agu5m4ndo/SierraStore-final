const
    Factory = require('../persistence/factory'),
    daoProductos = new Factory().bring('product'),
    { navConfig } = require('../services/nav.service')

const getHomeView = async(req, res) => {
    const product = await daoProductos.getAll();
    let { filename, cartAmount, cartId } = await navConfig(req.user);
    res.status(200).render('pages/index', { product, session: req.user, cartAmount, cartId, filename });
}

module.exports = { getHomeView }