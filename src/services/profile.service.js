const
    fs = require('fs'),
    path = require('path')

/*
 * Comparo la información recibida con la información previa del usuario
 * Si se ha adjuntado una imagen, se agrega al nuevo objeto y se elimina 
 * la imagen anterior
 */
const compare = (body, user, file) => { //.
    if (JSON.stringify(body) === JSON.stringify(user)) changes = true;


    if (file != null) {
        changes = true;
        body['profilePicture'] = file.filename
        fs.unlink(path.join(__dirname, '..', '..', 'views', 'uploads', 'profiles', user['profilePicture']), () => console.log('Imagen anterior eliminada'))
    }

    if (changes) {
        for (const key in body) {
            user[key] = body[key];
        }
    }
    return result = { changes, user }
}

module.exports = { compare }