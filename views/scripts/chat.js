const socket = io.connect('/chat');
const textInput = document.querySelector('.input-message');

//----------------------------------------------------------------------------------------
//---------------------------------CONFIGURACIÓN VISUAL-----------------------------------
//----------------------------------------------------------------------------------------

// Abre un chat para el soporte
const userChat = document.querySelectorAll('.user-chat');
userChat.forEach(chat => {
    chat.addEventListener('click', () => {
        textInput.dataset.chat = chat.dataset.email;
        console.log(chat.dataset.email)
        socket.emit('open-chat', chat.dataset.email)
    })
});

/*
 * Se encarga de cambiar el tamaño del input de los mensajes
 * dinámicamente. Además maneja el envío al presionar enter
 */
textInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        if (textInput.value != '') {
            addNewMessage(textInput.value);
            textInput.blur();
            textInput.value = '';
        }
    }
    textInput.style.height = 'auto';
    textInput.style.height = `${textInput.scrollHeight}px`;
    if (parseInt(textInput.style.height) >= 140) textInput.style.overflow = 'scroll';
    else textInput.style.overflow = 'hidden';
})

// Funcionalidad del botón de envío
const sendButton = document.querySelector('.send-button')
sendButton.addEventListener('click', () => {
    addNewMessage(textInput.value);
    textInput.blur();
    textInput.value = '';
    textInput.style.height = 'auto';
    textInput.style.height = `${textInput.scrollHeight}px`;
    textInput.style.overflow = 'hidden';
})

//----------------------------------------------------------------------------------------
//----------------------------------INYECCIÓN CON EJS-------------------------------------
//----------------------------------------------------------------------------------------

//Carga los mensajes de un chat desde una plantilla
const openChat = document.querySelector('.open-chat')
const loadMessages = async(messages) => {
    let html;
    const type = textInput.dataset.sender
    await fetch('../partials/chat-message.ejs')
        .then(res => res.text())
        .then(template => {
            html = ejs.render(template, { messages: messages, type: type });
        })
    openChat.innerHTML = html;
    openChat.scrollTop = openChat.scrollHeight;
}

//Carga la foto de perfil y nombre del usuario para el soporte 
const loadUserInfo = (user) => {
    const userInfo = document.querySelector('.user-info');
    const ejsTemplate = '<img src="/uploads/profiles/<%= user.filename %>" alt=""> <h2><%= user.name %> </h2>'
    const html = ejs.render(ejsTemplate, { user: user });
    userInfo.innerHTML = html;
}

//Carga los chats a los que puede acceder el soporte
const loadChats = async(chats) => {
    const chatList = document.querySelector('.chat-list');
    let html;
    await fetch('../partials/chats-list.ejs')
        .then(res => res.text())
        .then(template => {
            html = ejs.render(template, { chats: chats });
        })
    chatList.innerHTML = html;

    /*
     * Debido a que se agregaron elementos, los listeners anteriores
     * para el mismo tipo de elemento no han sido aplicados a estos
     */
    const userChat = document.querySelectorAll('.user-chat');
    userChat.forEach(chat => {
        chat.addEventListener('click', () => {
            textInput.dataset.chat = chat.dataset.email;
            console.log(chat.dataset.email)
            socket.emit('open-chat', chat.dataset.email)
        })
    });
}

//----------------------------------------------------------------------------------------
//---------------------------------CONFIGURACIÓN SOCKET-----------------------------------
//----------------------------------------------------------------------------------------

//Abre el chat para el usuario y obtiene los mensajes previos
if (document.querySelector('.support-button')) {
    const supportButton = document.querySelector('.support-button');
    supportButton.addEventListener('click', () => {
        socket.emit('open-chat', textInput.dataset.chat);
    })
}

const addNewMessage = async(message) => {
    object = {
        email: textInput.dataset.chat,
        type: textInput.dataset.sender,
        body: message
    }
    socket.emit('new-message', object)
}


socket.on('load-messages', result => {
    if (textInput.dataset.sender == 'sistema') {
        loadChats(result.chats)
    }
    //Evita que se carguen otros chats en la vista del usuario
    if (textInput.dataset.chat == result.singleChat.email) {
        loadMessages(result.singleChat.messages);
    }

});

socket.on('opening-chats', result => {
    loadMessages(result.messages);
    if (textInput.dataset.sender == 'sistema') {
        loadUserInfo(result.user);
    }
});