const axios = require('axios');

// Emulates a Mongo DB
const database = {
  products: new Map()
}

const loadProducts = async (page = 1) => {

  const { data: products } = await axios({
    method: 'GET',
    url: `https://eur.shein.com/c-index/getProducts?_lang=en&_ver=1.1.8&limit=24&page=${page}&routeId=00200200&type=selection`,
    transformResponse: [(data) => {
      // Refactor data to our needs, and remove unused properties
      return JSON.parse(data).map(product => ({ id: product.goods_id, imageUrl: product.goods_img, productName: product.goods_name, price: product.salePrice.usdAmountWithSymbol }));
    }]
  })

  database.products.set(page, products);

  return database;
}

const getAllProducts = async (page) => {
  try {
    if (!database.products.has(page)) {
      await loadProducts(page)
    }
    return database.products.get(page);
  } catch (error) {
    throw error;
  }
}

const createProduct = (productData = {}) => {
  try {
    const products = database.products;
    products.set(1, [productData, ...products.get(1)]);
    console.log([...products.get(1)])
    return productData;
  } catch (error) {
    throw error;
  }
}

const updateProductById = (productId, productNewData) => {
  try {
    let productUpdated;
    database.products.forEach((productsList, page) => {
      const product = productsList.find(product => product.id === productId);
      // Replace old product data with new one
      if (product) {
        Object.entries(productNewData).forEach(([key, value]) => product[key] = value)
        productUpdated = product;
      }
    })
    return productUpdated;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const deleteProductById = productId => {
  try {
    let productPage;
    let productIndex;
    database.products.forEach((productsList, page) => {
      const index = productsList.findIndex(product => product.id === productId);
      if (index >= 0) {
        productPage = page;
        productIndex = index;
      };
    })

    console.log({ productIndex, productPage })
    // Remove product from DB using his index
    database.products.get(productPage).splice(productIndex, 1);

    return true;
  } catch (error) {
    throw error;
  }
}

const existsProductWithId = productId => {
  try {
    let productExists = false;

    database.products.forEach((productsList, page) => {
      const product = productsList.find(product => product.id === productId);
      if (product) productExists = true;
    })

    return (!!productExists);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  loadProducts,
  getAllProducts,
  updateProductById,
  deleteProductById,
  createProduct,
  existsProductWithId
}