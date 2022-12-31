const mongoose = require('mongoose')

const chatsSchema = new mongoose.Schema({
    email: { type: String, require: true },
    messages: [{
        type: { type: String, require: true },
        day: { type: String, require: true },
        time: { type: String, require: true },
        body: { type: String, require: true },
    }]
})

const chats = new mongoose.model('Chat', chatsSchema);

module.exports = chats;