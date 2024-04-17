import { Product, ProductCreationAttributes } from "../models/Product";

export const productService = {
  findAllProducts: async (page: number, pageSize: number) => {
    const offset = (page - 1) * pageSize;
    const products = await Product.findAll({
      offset,
      limit: pageSize,
      order: [["id", "ASC"]],
    });

    return products;
  },
  save: async (product: ProductCreationAttributes) => {
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
  deleteProductById: async (id: number | string) => {
    return await Product.destroy({ where: { id } });
  },
};
