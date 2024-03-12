import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';

export const productController = {
  getProductById: async (req: Request, res: Response) => {
    const productId = +req.params.id;
    try {
      const product = await productService.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${productId} not found` });
      }

      return res.status(200).json(product);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await productService.findAllProducts();

      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },
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
  update: async (req: Request, res: Response) => {
    const productId = +req.params.id;
    const { description, quantity_stock, value, category_id } = req.body;

    try {
      const productExist = await productService.findById(productId);

      if (!productExist) {
        return res
          .status(404)
          .json({ message: `Product ${productId} not found` });
      }

      const categoryExist = await categoryService.findCategoryById(category_id);

      if (!categoryExist) {
        return res
          .status(404)
          .json({ message: `Category ${category_id} not found` });
      }

      const updatedProduct = await productService.update(productId, {
        description,
        quantity_stock,
        value,
        category_id,
      });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },
};
