const
    usuarios = require('../../../data/models/user'),
    bcrypt = require('bcrypt'),
    ContenedorMongo = require('../../containers/ContenedorMongoDB');
let instance;

class UsuariosDaoMongo extends ContenedorMongo {
    constructor() {
        super(usuarios);
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
        await super.create(user)
    }

    async getByUsername(username) {
        return await super.findOne({ username: `${username}` })
    }

    async updateUser(newUser) {
        await super.update({ username: newUser.username }, newUser)
    }

    async deleteUser(username) {
        await super.delete({ username: `${username}` })
    }

    static getInstance() {
        if (!instance) instance = new UsuariosDaoMongo();
        return instance;
    }
}

module.exports = UsuariosDaoMongo;