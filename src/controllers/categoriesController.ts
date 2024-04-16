import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";

export const categoriesController = {
  create: async (req: Request, res: Response) => {
    const { description } = req.body;

    try {
      const category = await categoryService.save({ description });

      return res.status(201).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    const categoryId = +req.params.id;
    const { description } = req.body;

    try {
      const categoryExist = await categoryService.findCategoryById(categoryId);

      if (!categoryExist) {
        return res
          .status(404)
          .json({ message: `Category ${categoryId} not found` });
      }

      const category = await categoryService.update(categoryId, {
        description,
      });

      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    const categoryId = +req.params.id;

    try {
      const categoryExist = await categoryService.findCategoryById(categoryId);

      if (!categoryExist) {
        return res
          .status(404)
          .json({ message: `Category ${categoryId} not found` });
      }

      await categoryService.deleteCategoryById(categoryId);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  getAllCategories: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      const categories = await categoryService.findAllCategories(
        page,
        pageSize
      );

      return res.status(200).json({ categories, page, pageSize });
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

      if (!category)
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
