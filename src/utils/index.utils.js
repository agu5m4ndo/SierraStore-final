const { toAdminPurchaseMail, toAdminRegisterMail, toUserPurchaseMail } = require('./email');
const { logError, logWarn, loggerConsole } = require('./logger-winston');
// const { textMessageTwilio } = require('./twilio');

module.exports = {
    toAdminPurchaseMail,
    toAdminRegisterMail,
    toUserPurchaseMail,
    logError,
    logWarn,
    loggerConsole,
    // textMessageTwilio
}