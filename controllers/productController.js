const Product = require('../models/productModel');

const createProducts = async (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('only admin can create products');
    err.status = 401;
    return next(err);
  }

  const products = req.body;
  if (!Array.isArray(products)) {
    const err = new Error('please input products inside an array');
    err.status = 400;
    return next(err);
  }

  try {
    const newProducts = await Promise.all(
      products.map((proposedProduct) => {
        const { name, description, price } = proposedProduct;
        const newProduct = new Product({
          name,
          description,
          price,
        });
        return newProduct.save();
      })
    );

    res.status(201).json({
      success: 'Successfully created products',
      products: newProducts,
    });
  } catch (err) {
    next(err);
  }
};

const retrieveActiveProducts = async (req, res) => {
  const activeProducts = await Product.find({ isActive: true });
  res.json(activeProducts);
};

module.exports = {
  createProducts,
  retrieveActiveProducts,
};
