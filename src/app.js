const express = require('express');
const handlebars  = require("express-handlebars");
const socketServer = require('./socket');

const app = express();

const httpServer = app.listen(8080, () => {
    console.log("Server running on port 8080");
  });

socketServer(httpServer);

app.engine('handlebars', handlebars.engine());
app.set("views", __dirname + '/views');
app.set("view engine", "handlebars");

app.use(express.static('public'));

app.productsPath = "/api/products";
app.cartsPath = "/api/carts";
app.homePath = "/"

app.use(app.productsPath, require("./routes/productsRouter"));
app.use(app.cartsPath, require("./routes/cartRouter"));
app.use(app.homePath, require("./routes/viewsRouter"));