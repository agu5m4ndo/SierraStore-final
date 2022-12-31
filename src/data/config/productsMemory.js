const data = require("../../utils/products.memory.json"),
    productos = [];

/*
 * Se llena el array con productos dentro de un JSON
 */
const populateArray = () => {
    data.productos.forEach((element) => { productos.push(element) })
    return productos;
}

module.exports = { populateArray };