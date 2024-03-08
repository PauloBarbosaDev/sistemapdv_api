import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';

export const productController = {
  save: async (req: AuthenticatedRequest, res: Response) => {
    const { description, quantity_stock, value, category_id } = req.body;

    try {
      const category = await categoryService.findCategoryById(category_id);

      if (!category)
        return res
          .status(404)
          .json({ message: `Category ${category_id} not found` });

      const product = await productService.create({
        description,
        quantity_stock,
        value,
        category_id,
      });

      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },
};
