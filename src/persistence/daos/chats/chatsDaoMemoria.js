const Chat = require('../../classes/chat'),
    ContenedorMemoria = require('../../containers/ContenedorMemoria'),
    { formatedDate } = require('../../../services/chat.service')
let instance;

class ChatsDaoMemoria extends ContenedorMemoria {
    createChat(object) {
        const chat = new Chat(object.email);
        if (!!object.body) {
            const now = formatedDate();
            chat.messages.push({
                type: object.type,
                day: now.day,
                time: now.hours,
                body: object.body
            })
        }
        super.create(chat)
    }

    async getChatByUsername(email) {
        return await super.findOne("email", email)
    }

    // Si se envía un mensaje y no hay un chat asociado, se creará
    async postMessage(newMessage) {
        const chat = await super.findOne("email", newMessage.email)
        if (chat == null) this.createChat(newMessage)
        else {
            const now = formatedDate();
            chat.messages.push({
                type: newMessage.type,
                day: now.day,
                time: now.hours,
                body: newMessage.body
            })
            super.update("email", chat.email, chat);
        }
    }

    async deleteChat(email) {
        await super.delete("email", email);
    }

    static getInstance() {
        if (!instance) instance = new ChatsDaoMemoria();
        return instance;
    }
}

module.exports = ChatsDaoMemoria;