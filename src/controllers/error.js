const { navConfig } = require('../services/nav.service')

const getErrorView = async(err, req, res, next) => {
    let { filename, cartAmount, cartId } = await navConfig(req.user);
    res.status(200).render('pages/error', { session: req.user, cartAmount, cartId, filename, error: err });
}

module.exports = { getErrorView }