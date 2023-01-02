const
    User = require('../../classes/user.js'),
    bcrypt = require('bcrypt'),
    { populateArray } = require('../../../data/config/usersMemory'),
    ContenedorMemoria = require('../../containers/ContenedorMemoria');
let instance;

class UsuariosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super();
        super.populate(populateArray()); //Coloca usuarios iniciales en el array
    }

    async createUser(object) {
        const hashedPassword = await bcrypt.hash(object.password, 10);
        const user = new User(object.username, hashedPassword, object.name, object.address, object.phoneNumber, object.profilePicture, "customer", -1);
        super.create(user)
    }

    async getByUsername(username) {
        return await super.findOne("username", username);
    }

    updateUser(username, newUser) {
        super.update("username", username, newUser);
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