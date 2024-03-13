import { Category } from '../models';
import { Product } from '../models/Product';

export const categoryService = {
  findAllCategories: async () => {
    const categories = await Category.findAll();

    return categories;
  },
  findCategoryById: async (id: string | number) => {
    const category = await Category.findByPk(id);

    return category;
  },
  getProductsByCategoryId: async (category_id: string | number) => {
    const products = await Product.findAll({ where: { category_id } });

    return products;
  },
};
