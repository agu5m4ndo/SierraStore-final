const
    picture = document.getElementById('avatar'),
    reader = new FileReader();

/*
 * Ambos métodos trabajan para renderizar la imagen de perfil
 * cuando se busca cambiarla en tiempo real en la vista de 
 * modificar perfil
 */
picture.addEventListener('change', (e) => {
    reader.readAsDataURL(e.target.files[0]);
})

reader.addEventListener('load', () => {
    document.querySelector('.user-picture').src = reader.result;
})