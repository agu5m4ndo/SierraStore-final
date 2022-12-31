const mongoose = require('mongoose')

const carritosSchema = new mongoose.Schema({
    timestamp: { type: String, require: true, max: 100 },
    deliveryLocation: { type: String, require: true },
    products: [{
        name: { type: String, require: true, max: 100 },
        description: { type: String, require: true, max: 100 },
        code: { type: String, require: true, max: 10 },
        thumbnail: { type: String, require: true, max: 100 },
        price: { type: Number, require: true },
        stock: { type: Boolean, require: true },
        timestamp: { type: String, require: true, max: 100 },
        id: { type: Number },
        amount: { type: Number },
    }],
    id: { type: Number }
})

const carritos = new mongoose.model('Cart', carritosSchema);

module.exports = carritos;