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

const retrieveSingleProduct = async (req, res) => {
  const { id } = req.params;
  const targetProduct = await Product.findById(id);
  res.json(targetProduct);
};

const updateProduct = async (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('non-admin not authorized to update the product');
    err.status = 401;
    return next(err);
  }

  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
      },
      { returnDocument: 'after' }
    );

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const archiveProduct = async (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = Error('cannot archive product if not an admin');
    err.status = 401;
    return next(err);
  }

  const { id } = req.params;

  try {
    const archivedProduct = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { returnDocument: 'after' }
    );

    res.json({
      message: 'successfully archived',
      archived: archivedProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProducts,
  retrieveActiveProducts,
  retrieveSingleProduct,
  updateProduct,
  archiveProduct,
};
