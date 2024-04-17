import { Request, Response } from "express";
import { customerService } from "../services/customerService";
import { productService } from "../services/productService";
import { orderService } from "../services/orderService";
import { orderProductsService } from "../services/orderProductsService";
import { emailService } from "../services/emailService";
import path = require("path");
import { htmlCompiler } from "../utils/htmlCompiler";

type OrderRequestProductsAttributes = {
  product_id: number;
  quantity: number;
  value?: number;
  totalValue?: number;
};

export const orderController = {
  create: async (req: Request, res: Response) => {
    const { customer_id, observation, order_products } = req.body;
    try {
      const customerExist = await customerService.findById(customer_id);

      if (!customerExist) {
        return res
          .status(404)
          .json({ message: `Customer ${customer_id} not found` });
      }

      for (const products of order_products) {
        const productExist = await productService.findById(products.product_id);

        if (!productExist) {
          return res
            .status(404)
            .json({ message: `Product ${products.product_id} not found` });
        }

        if (productExist.quantity_stock < products.quantity) {
          return res.status(400).json({
            message: `The requested quantity of the product with ID: ${products.product_id} exceeds the available stock quantity. `,
          });
        }
        products.value = productExist.value;
        products.totalValue = productExist.value * products.quantity;
      }

      const totalValue: number = order_products.reduce(
        (totalValue: number, currentValue: OrderRequestProductsAttributes) =>
          totalValue + currentValue.totalValue!,
        0
      );

      const order = await orderService.save({
        customer_id,
        observation,
        total_value: totalValue,
      });

      for (const products of order_products) {
        await orderProductsService.save({
          order_id: order.id,
          product_id: products.product_id,
          quantity: products.quantity,
          value: products.value,
        });
      }

      const htmlPath = path.join(__dirname, "../template/email.html");
      const html = await htmlCompiler(htmlPath, {
        name: customerExist.name,
        emailName: process.env.EMAIL_NAME,
        emailFrom: process.env.EMAIL_FROM,
      });

      emailService.sendEmail(
        `${customerExist.name} <${customerExist.email}>`,
        "Cofirmação de conclusão de pedido",
        html
      );

      return res.status(201).json(order);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  getAllOrders: async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const { customer_id } = req.query;

    try {
      if (customer_id) {
        const orders = await customerService.getOrdersByCustomerId(
          +customer_id
        );

        if (!orders || orders.length <= 0) {
          return res
            .status(404)
            .json({ message: `Customer ${customer_id} not found` });
        }

        return res.status(200).json(orders);
      }

      const order = await orderService.findAllOrders(page, pageSize);

      return res.status(200).json(order);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
