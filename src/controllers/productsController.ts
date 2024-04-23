import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import { orderProductsService } from "../services/orderProductsService";

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
        return res.status(400).json({ message: error.message });
      }
    }
  },
  getAllProducts: async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const { category_id } = req.query;
    try {
      if (category_id) {
        const products = await categoryService.findProductsByCategoryId(
          +category_id
        );

        if (!products || products.length <= 0) {
          return res
            .status(404)
            .json({ message: `Category ${category_id} not found` });
        }

        return res.status(200).json(products);
      }

      const products = await productService.findAllProducts(page, pageSize);

      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
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

      const product = await productService.save({
        description,
        quantity_stock,
        value,
        category_id,
      });

      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
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
        return res.status(400).json({ message: error.message });
      }
    }
  },
  delete: async (req: Request, res: Response) => {
    const productId = +req.params.id;

    try {
      const productExist = await productService.findById(productId);

      if (!productExist) {
        return res
          .status(404)
          .json({ message: `Product ${productId} not found` });
      }

      const productInOrder = await orderProductsService.getProductInOrder(
        productId
      );

      if (productInOrder) {
        return res.status(400).json({
          message: `Unable to delete the product as it's linked to an order.`,
        });
      }

      await productService.deleteProductById(productId);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
