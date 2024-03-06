import { Category } from '../models';

export const categoryService = {
  findAllCategories: async () => {
    const categories = await Category.findAll();

    return categories;
  },
};
