const cartSocket = io.connect('/carrito');

const
    deleteButton = document.querySelectorAll('.delete-button'),
    amountInput = document.querySelectorAll('.amount-input'),
    productsContainer = document.querySelector('.container'),
    cartIcon = document.querySelector('.cart-icon'),
    totalAmount = document.getElementById('total-amount'),
    productsAmount = document.getElementById('total-products'),
    shipmentAmount = document.getElementById('total-shipment');

//Actualiza el total del carrito en tiempo real
amountInput.forEach(input => {
    input.addEventListener('change', async(e) => {
        const cartId = cartIcon.dataset.id;
        //El valor está guardado 3 ordenes de magnitud hacia arriba
        const productId = e.target.parentElement.parentElement.parentElement.dataset.id;
        const params = { cartId, productId, amount: input.value }
        cartSocket.emit('update-cart', params)
        updatePrices(cartId);
    })
});

//Elimina un producto del carrito en tiempo real
deleteButton.forEach(button => {
    button.addEventListener('click', async(e) => {
        const cartId = cartIcon.dataset.id;
        const productId = e.target.parentElement.parentElement.parentElement.dataset.id;
        const params = { cartId, productId }
        cartSocket.emit('delete-product', params)
        cartIcon.dataset.count--;
        if (cartIcon.dataset.count == "0") {
            window.location.reload();
        } else {
            productsContainer.removeChild(e.target.parentNode.parentNode.parentNode.parentNode)
            updatePrices(cartId);
        }
    })
})

const updatePrices = async(cartId) => {
    const cart = await fetch(`/api/carrito/${cartId}/productos/`)
        .then(res => res.json())
        .then(data => { return data; })
    let totalPrice = 0,
        shipmentPrice = 0;
    cart.result.forEach(product => {
        totalPrice += product.price * product.amount;
    });
    shipmentPrice = totalPrice / 10;
    productsAmount.innerText = `Productos: $ ${totalPrice} USD`;
    shipmentAmount.innerText = `Envío: $ ${shipmentPrice} USD`;
    totalAmount.innerText = `Total: $ ${(totalPrice + shipmentPrice)} USD`;
}

//Acción del botón de compra del carrito
const purchaseButton = document.getElementById('purchase-button');
purchaseButton.addEventListener('click', async() => {
    window.location = '/carrito/success'
})