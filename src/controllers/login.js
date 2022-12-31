const { hasCart, assignNewCart } = require('../services/login.service'), { generateToken } = require('../middleware/jwt')

//Renderiza la vista de login
const getLoginView = (req, res) => {
    if (req.user) {
        res.redirect('/');
    }
    res.status(200).render('pages/login', { validations: null });
}

//Acciones sobre el carrito del usuario al iniciar sesión
const loginAction = async(req, res) => {
    const result = await hasCart(req.user || -1);
    if (!result) await assignNewCart(req.user);
    // const token = generateToken(req.user);
    // res.cookie("token", token, { maxAge: process.env.EXPIRATION_DATE })
    res.redirect('/')
}

module.exports = { getLoginView, loginAction }