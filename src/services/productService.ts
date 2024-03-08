import { Product, ProductCreationAttributes } from '../models/Product';

export const productService = {
  create: async (product: ProductCreationAttributes) => {
    const newProduct = await Product.create(product);

    return newProduct;
  },
};
