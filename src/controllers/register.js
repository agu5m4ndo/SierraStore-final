const { handleRegistration } = require('../services/register.service')

//Renderiza la vista de registro
const getRegisterView = (req, res) => {
    res.status(200).render('pages/register', { validations: null });
}

const registerUser = async(req, res) => {
    const body = {};
    for (const key in req.body) {
        body[key] = req.body[key];
    }
    body['profilePicture'] = req.body.file.filename;
    const result = await handleRegistration(body);
    if (result) res.redirect('/register');
    else res.redirect('/login')
}

module.exports = { getRegisterView, registerUser }