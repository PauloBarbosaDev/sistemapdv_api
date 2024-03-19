import {
  OrderProducts,
  OrderProductsCreationAttributes,
} from '../models/OrderProducts';

export const orderProductsService = {
  save: async (orderProducts: OrderProductsCreationAttributes) => {
    const newOrderProducts = await OrderProducts.create(orderProducts);

    return newOrderProducts;
  },
  getProductInOrder: async (productId: number) => {
    const newOrderProducts = await OrderProducts.findOne({
      where: { product_id: productId },
    });

    return newOrderProducts;
  },
};
