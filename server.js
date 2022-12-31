const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const cluster = require('cluster');
const rutas = require('./src/routes/index.routes');
const wrapper = require('./src/utils/wrapper');
const { getErrorView } = require('./src/controllers/error');
const { loggerConsole } = require('./src/utils/index.utils');
const numCpus = require('os').cpus().length;
const Factory = require('./src/persistence/factory');
const daoCarritos = new Factory().bring('cart');
const daoChats = new Factory().bring('chat');
const daoUsuarios = new Factory().bring('user');
require('dotenv').config();

// -------------------------------------------------CLUSTER------------------------------------------

if (cluster.isPrimary) {
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        loggerConsole.info(`Worker ${worker.process.pid} died`);
    })
} else {

    // ----------------------------------------------SERVIDOR------------------------------------------

    const app = express();
    const httpServer = new HttpServer(app);
    const io = new IOServer(httpServer);
    const port = process.env.PORT || 8080;

    app.set('view engine', 'ejs');

    httpServer.listen(port, () => {
        loggerConsole.info(`Server listening on port ${port}`);
    })

    // ----------------------------------------------SESSION------------------------------------------

    const session = require('./src/middleware/session');
    const cookieParser = require('cookie-parser');
    const { passport } = require('./src/middleware/passport');

    // ----------------------------------------------APP.USE()------------------------------------------

    app.use(cookieParser());
    app.use(session);
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', wrapper(rutas));
    app.use(getErrorView);
    app.use(express.static(__dirname + '/views'));

    // ----------------------------------------------SOCKET.IO------------------------------------------

    io.of('/carrito').on('connection', socket => {
        socket.on('update-cart', async(params) => {
            await daoCarritos.updateOneProduct(params.cartId, params.productId, params.amount);
        })

        socket.on('delete-product', async(params) => {
            await daoCarritos.removeFromCart(params.cartId, params.productId);
        })
    })

    /*
     * Cuando se envía un mensaje, este se guarda y luego se 
     * recuperan todos los mensajes del chat y todos los chats
     * para renderizar los cambios en ambas vistas
     */
    io.of('/chat').on('connection', socket => {
        socket.on('new-message', async(object) => {
            await daoChats.postMessage(object);
            const chat = await daoChats.getChatByUsername(object.email);
            const allChats = await daoChats.getAll();
            let chatInfo = [];
            for (let i = 0; i < allChats.length; i++) {
                const user = await daoUsuarios.getByUsername(allChats[i].email);
                const userData = { name: user.name, filename: user.profilePicture }
                const chatData = { email: allChats[i].email, lastMessage: allChats[i].messages[allChats[i].messages.length - 1] }
                chatInfo.push({...chatData, ...userData });
            }
            io.of('/chat').emit('load-messages', { singleChat: chat, chats: chatInfo });
        })

        socket.on('open-chat', async(email) => {
            const chat = await daoChats.getChatByUsername(email);
            if (chat != null) {
                const user = await daoUsuarios.getByUsername(email);
                const userData = { name: user.name, filename: user.profilePicture }
                socket.emit('opening-chats', { messages: chat.messages, user: userData });
            }
        })
    })
}