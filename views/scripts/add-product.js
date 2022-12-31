const form = document.getElementById('add-product-form');

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const code = formData.get('code');
    const exists = await fetch(`/api/productos/${code}`).then(res => res.json()).then(data => { return data.result })

    //si el código de producto no existe en la base de datos, agrega el producto
    if (exists != null) {
        alert(`El producto con el código ${code} ya existe`)
    } else {
        if (thumbnail == null) {
            alert('Debe proveer una imagen')
        } else {
            await fetch('/api/productos', {
                method: 'POST',
                body: formData
            })
        }
    }
})