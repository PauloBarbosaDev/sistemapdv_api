import { Request, Response } from 'express';
import { categoryService } from '../services/categoryService';

export const categoriesController = {
  getAllCategories: async (req: Request, res: Response) => {
    try {
      const categories = await categoryService.findAllCategories();

      return res.status(200).json(categories);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },
};
