const { check, validationResult } = require('express-validator'), { navConfig } = require('../services/nav.service'),
    Factory = require('../persistence/factory'),
    daoProductos = new Factory().bring('product'),
    daoUsuarios = new Factory().bring('user')
let page, object;

const registerValidation = [
    check('username', 'Ingrese un email válido').exists().not().isEmpty().isEmail().custom(async(value) => {
        const exists = await daoUsuarios.getByUsername(value);
        console.log(exists)
        if (exists != null) {
            throw new Error(`El usuario ingresado ya se encuentra registrado`)
        }
    }),
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
    check('username', 'Ingrese un email válido').exists().not().isEmpty().isEmail().custom(async(value, { req }) => {
        if (value != req.user.username) {
            const exists = await daoUsuarios.getByUsername(value);
            if (exists != null) {
                throw new Error(`El usuario ingresado ya se encuentra registrado`)
            }
        }
    }),
    check('address', 'Ingrese una dirección').exists().not().isEmpty(),
    check('phoneNumber', 'Ingrese un número de teléfono').exists().not().isEmpty().isNumeric(),
    async(req, res, next) => {
        const { filename, cartAmount, cartId } = await navConfig(req.user);
        page = 'pages/profile'
        object = { session: req.user, filename, cartAmount, cartId }
        validateResult(req, res, next)
    }
]

const productValidation = [
    check('name', 'Ingrese un nombre').exists().not().isEmpty(),
    check('code', 'Ingrese un código válido').exists().not().isEmpty().custom(async(value) => {
        const exists = await daoProductos.getByCode(value);
        if (exists != null) {
            throw new Error(`El código de producto ${value} ya está en uso`);
        }
        return true;
    }),
    check('price', 'Ingrese un precio').exists().not().isEmpty().isNumeric(),
    check('description', 'Ingrese una descripción').exists().not().isEmpty(),
    async(req, res, next) => {
        page = 'pages/addProduct'
        validateResult(req, res, next)
    }
]

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        if (object) {
            res.status(403).render(page, {...object, validations: error.array() })
        }
        res.status(403).render(page, { validations: error.array() })
    }
}

module.exports = { registerValidation, loginValidation, profileValidation, productValidation };