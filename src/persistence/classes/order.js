class Order {
    constructor() {
            this.timestamp = new Date().getTime();
            this.items = [];
            this.state = "generada";
        } //order number se crearía luego de ver el número de ordenes que existen
}

module.exports = Order