const { check, validationResult } = require('express-validator'), { navConfig } = require('../services/nav.service')
let page, object;

const registerValidation = [
    check('username', 'Ingrese un email válido').exists().not().isEmpty().isEmail(),
    check('password', 'Ingrese una contraseña').exists().not().isEmpty().custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    check('name', 'Ingrese un nombre').exists().not().isEmpty(),
    check('address', 'Ingrese una dirección').exists().not().isEmpty(),
    check('phoneNumber', 'Ingrese un número de teléfono').exists().not().isEmpty().isNumeric(),
    (req, res, next) => {
        page = 'pages/register';
        validateResult(req, res, next)
    }
]

const loginValidation = [
    check('username', 'Ingrese un email válido').exists().not().isEmpty().isEmail(),
    check('password', 'Ingrese una contraseña').exists().not().isEmpty(),
    (req, res, next) => {
        page = 'pages/login';
        validateResult(req, res, next)
    }
]

const profileValidation = [
    check('name', 'Ingrese un nombre').exists().not().isEmpty(),
    check('username', 'Ingrese un email válido').exists().not().isEmpty().isEmail(),
    check('address', 'Ingrese una dirección').exists().not().isEmpty(),
    check('phoneNumber', 'Ingrese un número de teléfono').exists().not().isEmpty().isNumeric(),
    async(req, res, next) => {
        const { filename, cartAmount, cartId } = await navConfig(req.user);
        page = 'pages/profile'
        object = { session: req.user, filename, cartAmount, cartId }
        validateResult(req, res, next)
    }
]

const validateResult = (req, res, next) => {
    // console.log(req.file)
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        console.log(error.array())
        if (object) {
            res.status(403).render(page, {...object, validations: error.array() })
        }
        res.status(403).render(page, { validations: error.array() })
    }
}

module.exports = { registerValidation, loginValidation, profileValidation };