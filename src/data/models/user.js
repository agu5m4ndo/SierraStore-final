const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    address: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    profilePicture: { type: String, require: true },
    role: { type: String },
    cart: { type: Number }
})

const usuarios = new mongoose.model('User', userSchema);

module.exports = usuarios;