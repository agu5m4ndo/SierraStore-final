const addToCartButton = document.getElementById('add-to-cart');

//Listener que añade un producto al carrito 
addToCartButton.addEventListener('click', async() => {
    await addProductToCart();
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.dataset.count = await fetch(`/api/carrito/${cartIcon.dataset.id}/productos`)
        .then((res) => res.json())
        .then((data) => { return data.result.length })
})

const buyProductButton = document.getElementById('buy-product');

//Listener que añade un producto al carrito y te redirecciona al carrito
buyProductButton.addEventListener('click', async() => {
    await addProductToCart();
    window.location = '/carrito';
})

/*
 * Ambos listeners comparten los mismos datos.
 * Se utiliza dataset para almacenar información en el front para obtenerla
 * de manera más sencilla. No es seguro, mejorar
 */
const addProductToCart = async() => {
    const cartId = document.querySelector('.cart-icon').dataset.id;
    const productCode = document.querySelector('.product-info').dataset.code;
    const amount = document.querySelector('.amount-input').value;
    await fetch(`/api/carrito/${cartId}/productos/${productCode}`, { method: 'POST', body: JSON.stringify({ amount }), headers: { 'Content-type': 'application/json' } })
}