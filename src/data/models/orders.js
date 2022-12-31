const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    date: { type: String, require: true, max: 100 },
    orderNumber: { type: Number },
    items: [{
        name: { type: String, require: true, max: 100 },
        code: { type: String, require: true, max: 10 },
        price: { type: Number, require: true },
        amount: { type: Number, require: true },
    }],
    state: { type: String, require: true },
    email: { type: String, require: true },
})

const orders = new mongoose.model('Order', ordersSchema);

module.exports = orders;