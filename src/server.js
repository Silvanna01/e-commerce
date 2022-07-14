const http = require('http');
const app = require('./app');
const { loadProducts } = require('./models/products/products.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

(async function startServer() {
  try {
    await loadProducts();
    server.listen(PORT, console.log(`Listening on PORT ${PORT}`));
  } catch (error) {
    console.error(error);
  }
})()