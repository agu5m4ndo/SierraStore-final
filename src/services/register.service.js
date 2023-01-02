const
    Factory = require('../persistence/factory'),
    daoUsuarios = new Factory().bring('user'),
    { logWarn, logError, loggerConsole, toAdminRegisterMail } = require('../utils/index.utils'),
    path = require('path'),
    fs = require('fs');


/*
 * Verifica que el usuario no esté registrado con anterioridad.
 *   -Si lo está, borrará la imagen guardada por multer.
 *   -Si no lo está, guardará al usuario y enviará un mail al admin 
 */
const handleRegistration = async(body) => {
    try {
        const user = await daoUsuarios.getByUsername(body['username']);
        if (user != null) {
            logWarn.warn(`El usuario ${body['username']} ya existe`)
            fs.unlink(path.join(__dirname, '..', '..', 'views', 'uploads', 'profiles', body['profilePicture']), () => console.log('Eliminado'))
            return false
        } else {
            await daoUsuarios.createUser(body);
            loggerConsole.info(`Usuario ${body['username']} creado con éxito`)
            toAdminRegisterMail(body)
            return true
        }
    } catch (error) {
        logError.error('No se ha podido completar el registro ' + error)
    }
}

module.exports = { handleRegistration };