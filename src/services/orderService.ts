import { Order, OrderCreationAttributes } from '../models/Order';

export const orderService = {
  save: async (order: OrderCreationAttributes) => {
    const newOrder = Order.create(order);

    return newOrder;
  },
};
