class Product {
    constructor(name, description, code, thumbnail, price, stock, category) {
        this.name = name;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
        this.timestamp = new Date().getTime();
        this.category = category
    }
}

module.exports = Product