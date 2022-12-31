const
    Factory = require('../persistence/factory'),
    daoUsuarios = new Factory().bring('user'),
    { navConfig } = require('../services/nav.service'),
    { logError } = require('../utils/index.utils'),
    { compare } = require('../services/profile.service')

//Renderiza la vista de edición de usuario 
const getProfileView = async(req, res) => {
    let { filename, cartAmount, cartId } = await navConfig(req.user);
    res.render('pages/profile', { session: req.user, filename, cartAmount, cartId, validations: null });
}

const editProfile = async(req, res) => {
    const body = req.body,
        user = req.user;

    let result = compare(body, user, req.file);
    if (result.changes) {
        try {
            await daoUsuarios.updateUser(result.user)
        } catch (error) {
            logError.error('Error al modificar el usuario ' + error)
        }
    }
    res.redirect('/')
}

module.exports = { getProfileView, editProfile }