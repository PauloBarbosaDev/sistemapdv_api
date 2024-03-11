import { Product, ProductCreationAttributes } from '../models/Product';

export const productService = {
  create: async (product: ProductCreationAttributes) => {
    const newProduct = await Product.create(product);

    return newProduct;
  },
  update: async (
    id: number,
    attributes: {
      description: string;
      quantity_stock: number;
      value: number;
      category_id: number;
    }
  ) => {
    const [effectedRows, updatedProducts] = await Product.update(attributes, {
      where: { id },
      returning: true,
    });

    return updatedProducts[0];
  },
  findById: async (id: number | string) => {
    const product = await Product.findByPk(id);

    return product;
  },
};
