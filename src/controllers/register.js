const { handleRegistration } = require('../services/register.service')

//Renderiza la vista de registro
const getRegisterView = (req, res) => {
    res.status(200).render('pages/register', { validations: null });
}

const registerUser = async(req, res) => {
    console.log(req.file)
    const body = {};
    for (const key in req.body) {
        body[key] = req.body[key];
    }
    body['profilePicture'] = req.file.filename;
    const result = await handleRegistration(body);
    result ? res.redirect('/login') : res.redirect('/register', { validations: null })
}

module.exports = { getRegisterView, registerUser }