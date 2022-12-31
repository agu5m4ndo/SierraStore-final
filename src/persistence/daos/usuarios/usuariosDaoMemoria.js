const
    User = require('../../classes/user.js'),
    ContenedorMemoria = require('../../containers/ContenedorMemoria');
let instance;

class UsuariosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super();
    }

    createUser(object) {
        const user = new User(object.username, object.password, object.name, object.address, object.phoneNumber, object.profilePicture, "customer", -1)
        super.create(user);
    }

    async getByUsername(username) {
        return await super.findOne("username", username);
    }

    updateUser(newUser) {
        super.update("username", newUser.username, newUser);
    }

    deleteUser(username) {
        super.delete("username", username)
    }

    static getInstance() {
        if (!instance) instance = new UsuariosDaoMemoria();
        return instance;
    }
}

module.exports = UsuariosDaoMemoria;