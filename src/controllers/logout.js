const { deleteToken } = require('../middleware/jwt'), { hasProducts, cartRemoval } = require('../services/logout.service')

const logout = async(req, res) => {
    const result = await hasProducts(req.user);
    await cartRemoval(req.user, result);
    req.session.destroy();
    // deleteToken;
    res.clearCookie('connect.sid', { path: '/' }).status(200);
    res.redirect('/login')
}

module.exports = { logout };