const { Router } = require("express");
const viewsRouter = Router();
const ProductManager = require("../productManager");


const productManager = new ProductManager("../db/products.json");


viewsRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  try {
    res.render("home", {
      title: "Handlebars Home",
      nombre: "pagina principal de Handlebars",
      products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  try {
    res.render("realTimeProducts", {
      title: "Handlebars Realtime",
      nombre: "pagina en tiempo real de Handlebars",
      products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});

module.exports = viewsRouter;