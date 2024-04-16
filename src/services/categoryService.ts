import { Category } from "../models";
import { CategoryCreationAttributes } from "../models/Category";
import { Product } from "../models/Product";

export const categoryService = {
  save: async (category: CategoryCreationAttributes) => {
    const newCategory = await Category.create(category);

    return newCategory;
  },

  update: async (id: number, attributes: { description: string }) => {
    const [effectedRows, updatedCategories] = await Category.update(
      attributes,
      {
        where: { id },
        returning: true,
      }
    );

    return updatedCategories[0];
  },

  deleteCategoryById: async (id: number) => {
    return await Category.destroy({ where: { id } });
  },

  findAllCategories: async (page: number, pageSize: number) => {
    const offset = (page - 1) * pageSize;
    const categories = await Category.findAll({
      offset,
      limit: pageSize,
      order: [["id", "ASC"]],
    });

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
