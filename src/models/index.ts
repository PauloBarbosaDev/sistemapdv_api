import { Category } from './Category';
import { Customer } from './Customer';
import { Product } from './Product';
import { User } from './User';
import { Order } from './Order';
import { OrderProducts } from './OrderProducts';

Category.hasMany(Product);
Product.belongsTo(Category);

export { Category, Customer, Product, User, Order, OrderProducts };
