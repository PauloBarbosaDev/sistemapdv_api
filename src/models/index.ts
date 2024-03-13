import { Category } from './Category';
import { Customer } from './Customer';
import { Product } from './Product';
import { User } from './User';

Category.hasMany(Product);
Product.belongsTo(Category);

export { Category, Customer, Product, User };
