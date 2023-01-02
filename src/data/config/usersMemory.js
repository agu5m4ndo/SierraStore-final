const data = require("../../utils/users.memory.json"),
    usuarios = [];

/*
 * Se llena el array con productos dentro de un JSON
 */
const populateArray = () => {
    data.users.forEach((element) => { usuarios.push(element) })
    return usuarios;
}

module.exports = { populateArray };