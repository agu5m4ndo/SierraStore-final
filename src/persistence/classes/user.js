class User {
    constructor(username, password, name, address, phoneNumber, profilePicture, role, cart) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
        this.role = role;
        this.cart = cart;
    }
}
module.exports = User;