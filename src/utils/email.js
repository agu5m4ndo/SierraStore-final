const { createTransport } = require('nodemailer'), { logError } = require('../utils/logger-winston')

const admin = {
    email: process.env.EMAIL,
    password: process.env.PASSWORD
}

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: admin.email,
        pass: admin.password
    }
})

//Mail enviado al administador cuando se registra un usuario
const toAdminRegisterMail = async(data) => {
    const emailContent = {
        from: "sierrastore@gmail.com",
        to: admin.email,
        subject: "Nuevo registro",
        html: `<h1>Nuevo usuario registrado en Sierra</h1><p>Nombre: ${data.name}</p><p>Email: ${data.username}</p>`
    }
    try {
        await transporter.sendMail(emailContent);
    } catch (error) {
        logError.error("Error al enviar mail de registro: " + err);
    }
}

//genera una lista utilizando la etiqueta <li> para enviar en el mail
const productsList = (data) => {
    let liContainer = "";
    for (let i = 0; i < data.products.length; i++) {
        liContainer += `<li>(${data.products[i].amount}) ${data.products[i].name}</li>` //Ver como se llama Cuando lo traemos
    }
    return liContainer;
}

//Mail enviado al administador cuando un usuario realiza una compra
const toAdminPurchaseMail = async(data) => {
    const emailContent = {
        from: "sierrastore@gmail.com",
        to: admin.email,
        subject: `Nuevo pedido de ${data.name}`,
        html: `<h1>Pedido en Sierra</h1><p>Comprador: ${data.name}</p><p>Email: ${data.username}</p><ul>${productsList(data)}</ul>`
    }
    try {
        await transporter.sendMail(emailContent);
    } catch (error) {
        logError.error("Error al enviar mail de confirmación de pedido: " + err);
    }

}

//Mail enviado al usuario cuando realiza una compra
const toUserPurchaseMail = async(data) => {
    const emailContent = {
        from: "sierrastore@gmail.com",
        to: data.username,
        subject: "Compra realizada en Sierra Store",
        html: `<h1>Muchas gracias por comprar!</h1>
        <p>${data.name} tu pedido fue recibido y está siendo procesado</p>
        <h2>Detalles del pedido: </h2>
        <ul>${productsList(data)}</ul>`
    }
    try {
        await transporter.sendMail(emailContent);
    } catch (error) {
        logError.error("Error al enviar mail de compra al usuario: " + err);
    }
}
module.exports = { toAdminRegisterMail, toAdminPurchaseMail, toUserPurchaseMail }