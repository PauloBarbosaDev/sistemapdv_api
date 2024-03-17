import { Category } from './Category';
import { Customer } from './Customer';
import { Product } from './Product';
import { User } from './User';
import { Order } from './Order';
import { OrderProducts } from './OrderProducts';

Order.hasMany(OrderProducts, { foreignKey: 'order_id' });

OrderProducts.belongsTo(Order, { foreignKey: 'order_id' });
OrderProducts.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(OrderProducts, { foreignKey: 'product_id' });

export { Category, Customer, Product, User, Order, OrderProducts };
