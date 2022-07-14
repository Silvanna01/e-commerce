const { getAllProducts, getProductById, existsProductWithId, createProduct, deleteProductById, updateProductById } = require('../../../models/products/products.model');
const { formatObjectValues } = require("../../../utils/functions");


const httpGetAllProducts = async (req, res) => {
  const { page } = req.query;
  try {
    return res.status(200).json(await getAllProducts(Number(page)));
  } catch (err) {
    // TODO: Customize error response
    return res.status(500).json({ ...err, message: err.message });
  }
}

const httpGetProduct = (req, res) => {
  try {
    const { id } = req.params;

    const productExists = existsProductWithId(Number(id));
    if (!productExists) return res.status(404).json({
      message: 'Product not found',
    });

    return res.status(200).json(getProductById(Number(id)))
  } catch (err) {
    // TODO: Customize error response
    return res.status(500).json({ ...err, message: err.message });
  }
}

const httpCreateProduct = (req, res) => {
  try {
    const productData = req.body;

    // Check for any incongruity on the Data entry
    const isDataValid = productData.imageUrl && productData.productName && productData.price;
    if (!isDataValid) return res.status(400).json({
      message: 'Data entry no valid'
    })

    return res.status(201).json(createProduct(productData));
  } catch (err) {
    // TODO: Customize error response
    return res.status(500).json({ ...err, message: err.message });
  }
}

const httpUpdateProduct = (req, res) => {
  try {
    const { id: productId } = req.params;
    const productNewData = req.body;
    return res.status(200).json(updateProductById(Number(productId), productNewData))
  } catch (err) {
    // TODO: Customize error response
    return res.status(500).json({ ...err, message: err.message });
  }
}

const httpDeleteProduct = (req, res) => {
  try {
    const { id } = req.params;

    const productExists = existsProductWithId(Number(id));
    if (!productExists) return res.status(404).json({
      message: 'Product not found',
    });

    const isDeleted = deleteProductById(Number(id));
    if (!isDeleted) {
      throw new Error('Error on deleting product')
    }

    // Everything went smoothly.
    return res.status(200).json({
      ok: true,
    })
  } catch (err) {
    // TODO: Customize error response
    return res.status(500).json({ ...err, message: err.message });
  }
}

module.exports = {
  httpGetAllProducts,
  httpGetProduct,
  httpCreateProduct,
  httpUpdateProduct,
  httpDeleteProduct,
}