const multer = require('multer'),
    path = require('path')

//Sube el avatar del usuario en la carpeta profiles
let uploadAvatar = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'views/uploads/profiles')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
})

//Sube la imagen del producto en la carpeta products
let uploadProduct = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'views/uploads/products')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
})

module.exports = { uploadAvatar, uploadProduct }