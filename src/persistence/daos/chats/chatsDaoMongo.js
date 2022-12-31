const chats = require('../../../data/models/chats'),
    ContenedorMongo = require('../../containers/ContenedorMongoDB'),
    { formatedDate } = require('../../../services/chat.service')
let instance;

class ChatsDaoMongo extends ContenedorMongo {
    constructor() {
        super(chats);
    }

    async createChat(object) {
        const chat = new chats({
            email: object.email,
        })
        if (!!object.body) {
            const now = formatedDate();
            chat.messages.push({
                type: object.type,
                day: now.day,
                time: now.hours,
                body: object.body
            })
        }
        await super.create(chat)
    }

    async getChatByUsername(email) {
        return await super.findOne({ email: `${email}` })
    }

    //Para agregar mensajes
    async postMessage(newMessage) {
        const chat = await super.findOne({ email: `${newMessage.email}` })
        if (chat == null) await this.createChat(newMessage)
        else {
            const now = formatedDate();
            chat.messages.push({
                type: newMessage.type,
                day: now.day,
                time: now.hours,
                body: newMessage.body
            })
            await super.update({ email: `${chat.email}` }, chat)
        }
    }

    async deleteChat(email) {
        await super.delete({ email: `${email}` })
    }

    static getInstance() {
        if (!instance) instance = new ChatsDaoMongo();
        return instance;
    }
}

module.exports = ChatsDaoMongo;