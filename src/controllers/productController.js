const { prisma } = require('../config/db');
const { validateSizes } = require('../utils/sizeValidation');

async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: true,
        sizes: true,
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getProductById(req, res) {
  try {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        categories: true,
        sizes: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getProductByCategory(req, res) {
  try {
    const categoryName = req.params.category;
    const category = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      return res.status(404).json({ message: `Product with category ${categoryName} not found` });
    }

    return res.status(200).json({ products: category.products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function createProduct(req, res) {
  try {
    const { name, description, price, image, categories, sizes } = req.body;

    const invalidSizes = validateSizes(sizes);

    if (invalidSizes.length > 0) {
      return res.status(400).json({ message: 'Invalid sizes provided', invalidSizes });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        category: {
          connectOrCreate: categories.map((categoryName) => ({
            where: { name: categoryName },
            create: { name: categoryName },
          })),
        },

        sizes: {
          create: sizes,
        },
      },
      include: {
        category: true,
        sizes: true,
      },
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateProductById(req, res) {
  try {
    const productId = req.params.id;
    const { name, description, price, image, categories, sizes } = req.body;

    const invalidSizes = validateSizes(sizes);

    if (invalidSizes.length > 0) {
      return res.status(400).json({ message: 'Invalid sizes provided', invalidSizes });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        description,
        price,
        image,
        category: {
          connectOrCreate: categories.map((categoryName) => ({
            where: { name: categoryName },
            create: { name: categoryName },
          })),
        },
        sizes: {
          deleteMany: {},
          create: sizes,
        },
      },
      include: {
        category: true,
        sizes: true,
      },
    });

    return res.status(200).json({ product: updatedProduct, message: 'Product updated successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteProductById(req, res) {
  try {
    const productId = req.params.id;

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProductById,
  deleteProductById,
};
