const Factory = require('../persistence/factory'),
    daoChats = new Factory().bring('chat'),
    daoUsuarios = new Factory().bring('user'),
    { formatedDate } = require('../services/chat.service')

const getChatView = async(req, res) => {
    const allChats = await daoChats.getAll();
    let chatInfo = [];
    for (let i = 0; i < allChats.length; i++) {
        const user = await daoUsuarios.getByUsername(allChats[i].email);
        const userData = { name: user.name, filename: user.profilePicture }
        const chatData = { email: allChats[i].email, lastMessage: allChats[i].messages[allChats[i].messages.length - 1] }
        chatInfo.push({...chatData, ...userData });
    }
    res.status(200).render('pages/chat', { chats: chatInfo });
}

const postMessage = async(req, res) => {
    let type;
    if (req.user.role == 'admin') type = 'sistema';
    else type = 'usuario';

    const now = formatedDate();

    console.log(now.day + " " + now.hours)

    const newMessage = {
        email: req.user.username,
        type,
        day: now.day,
        time: now.hours,
        body: req.body['message'],
    }

    await daoChats.postMessage(newMessage)
    res.status(201).json({ sucess: 'true' })
}

const getMessages = async(req, res) => {
    const result = await daoChats.getChatByUsername(req.body['email']);
    res.status(200).json({ result })
}

module.exports = { getChatView, postMessage, getMessages }