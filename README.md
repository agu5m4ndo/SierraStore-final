# SierraStore
Proyecto de un ecommerce con node

![presentación-sierra](https://user-images.githubusercontent.com/75182327/210292162-a8303d7c-bdd5-4374-9700-2cb41144cac3.png)

Este es un proyecto desarrollado para el final del curso de backend de coderhouse. Cuenta con los siguientes paquetes para su funcionamiento: 
- express
- node
- mongodb
- passport 
- ejs
- multer
- express-validator
- winston-logger

## Probar el proyecto
1. Primero debes importar el proyecto. Para esto, crea una carpeta e inicializa git en ella usando `git init`.
2. Clona el contenido de este repositorio utilizando `git clone https://github.com/agu5m4ndo/SierraStore-final`.
3. Crea un archivo `.env` en el que vas a colocar la siguiente información:

    ```#Server config
    PORT = 8080
    CONNECTION_LINK = tudatabasedemongo
    AMBIENT = prod

    #Multer config
    EMAIL = tuemail@gmail.com
    PASSWORD = tupassword 
    
4. Escribe en línea de comandos `npm run dev`.
5. Dirígete a `localhost:8080` en tu navegador


## Rol de administrador
Al registrar un usuario, puedes dirigirte a tu base de datos en mongo y cambiar tu rol a "admin" lo cual te permitirá añadir productos y hacer soporte de las consultas de los cliente

### Añadir productos

Al tener acceso administrador, se pueden añadir productos en la página principal. El botón "agregar" a la izquierda de tu foto de perfil te llevará a la página que te permite añadirlos, y el modelo que debes seguir para hacerlo.

![2023-01-02 23_20_56-Añadir producto - Brave](https://user-images.githubusercontent.com/75182327/210292625-c12828da-d61c-41f7-9178-aaa2c8c6050d.png)

Ten en cuenta que si decides cambiar el estado del stock a "No", el producto no será mostrado en la página.
La ruta "/src/utils/products.memory.json" lleva a un json con productos para cargar en caso de no contar con estos al momento de iniciar la aplicación.

### Chat

Puedes acceder al chat desde el botón inferior a la derecha si eres un cliente o a través de la ruta "/chat" de la página si eres administrador.

Vista del administrador:

![soporte](https://user-images.githubusercontent.com/75182327/210293427-ac71e1a1-eae0-4564-b832-35d8f20a5056.png)

Vista del cliente:

![cliente](https://user-images.githubusercontent.com/75182327/210293426-38595eca-0e99-4430-a375-14b117351186.png)



#
