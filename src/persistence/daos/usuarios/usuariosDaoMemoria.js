const
    User = require('../../classes/user.js'),
    bcrypt = require('bcrypt'),
    ContenedorMemoria = require('../../containers/ContenedorMemoria');
let instance;

class UsuariosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super();
    }

    async createUser(object) {
        const hashedPassword = await bcrypt.hash(object.password, 10);
        const user = new usuarios({
            username: object.username,
            password: hashedPassword,
            name: object.name,
            address: object.address,
            phoneNumber: object.phoneNumber,
            profilePicture: object.profilePicture,
            role: "customer",
            cart: -1
        })
        super.create(user)
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