const { Server } = require('socket.io')
const ProductManager = require("./productManager");
const productManager = new ProductManager("../db/products.json");


const socketServer = (httpServer) => {
    const ioserver = new Server(httpServer);

    ioserver.on('connection',async (socket) => {
        console.log("Usuario Conectado");

        const products = await productManager.getProducts();
        socket.emit("newProduct", products);

        socket.on("addProduct", async (product) => {
            await productManager.addProduct(product);
            const products = await productManager.getProducts();
            socket.emit("newProduct", products);
          });

          socket.on("deleteProduct", async (id) => {
            await productManager.deleteProductById(id);
            const products = await productManager.getProducts();
            socket.emit("newProduct", products);
          });

        });
}

module.exports = socketServer