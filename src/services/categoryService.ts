import { Category } from '../models';

export const categoryService = {
  findAllCategories: async () => {
    const categories = await Category.findAll();

    return categories;
  },
  findCategoryById: async (id: string | number) => {
    const category = await Category.findByPk(id);

    return category;
  },
};
