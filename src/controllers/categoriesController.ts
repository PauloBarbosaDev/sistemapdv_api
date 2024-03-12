import { Request, Response } from 'express';
import { categoryService } from '../services/categoryService';

export const categoriesController = {
  getAllCategories: async (req: Request, res: Response) => {
    try {
      const categories = await categoryService.findAllCategories();

      return res.status(200).json(categories);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  getCategoryById: async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    try {
      const category = await categoryService.findCategoryById(categoryId);

      if (category === null)
        return res
          .status(404)
          .json({ message: `Category ${categoryId} not found` });

      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
