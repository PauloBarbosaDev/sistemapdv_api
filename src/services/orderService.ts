import { OrderProducts, Product } from '../models';
import { Order, OrderCreationAttributes } from '../models/Order';

export const orderService = {
  save: async (order: OrderCreationAttributes) => {
    const newOrder = Order.create(order);

    return newOrder;
  },
  findAllOrders: async () => {
    const orders = await Order.findAll({
      attributes: ['id', 'total_value', 'observation', 'customer_id'],
      include: [
        {
          model: OrderProducts,
          attributes: ['id', 'quantity', 'value', 'order_id', 'product_id'],
        },
      ],
      order: [['id', 'ASC']],
    });
    return orders;
  },
};
