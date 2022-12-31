const
    twilio = require('twilio'),
    { logError } = require('../utils/logger-winston')

//Información de twilio del administrador
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = twilio(accountSid, authToken)

const textMessageTwilio = async(data) => {
    try {
        await client.messages.create({
            body: `${data.name} tu pedido fue recibido y está siendo procesado`,
            from: process.env.PHONE_NUMBER,
            to: data.number
        })
    } catch (error) {
        logError.error("Error al enviar mensaje de texto de confirmación: " + err);
    }
}

module.exports = { textMessageTwilio }