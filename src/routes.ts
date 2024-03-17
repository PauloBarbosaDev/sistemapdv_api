import express from 'express';
import { categoriesController } from './controllers/categoriesController';
import { authController } from './controllers/authController';
import { usersController } from './controllers/usersController';
import { ensureAuth } from './middlewares/auth';
import { productController } from './controllers/productsController';
import { customerController } from './controllers/customerController';
import { orderController } from './controllers/orderController';

const router = express.Router();

router.post('/auth/register', authController.register);

router.post('/auth/login', authController.login);

router.post('/categories', ensureAuth, categoriesController.create);

router.put('/categories/:id', ensureAuth, categoriesController.update);

router.delete('/categories/:id', ensureAuth, categoriesController.delete);

router.get('/categories/:id', categoriesController.getCategoryById);

router.get('/categories', categoriesController.getAllCategories);

router.get('/user', ensureAuth, usersController.getuserDetail);

router.put('/user', ensureAuth, usersController.update);

router.put('/user/password', ensureAuth, usersController.updatePassword);

router.post('/product', ensureAuth, productController.save);

router.put('/product/:id', ensureAuth, productController.update);

router.get('/product/:id', ensureAuth, productController.getProductById);

router.delete('/product/:id', ensureAuth, productController.delete);

router.get('/product', ensureAuth, productController.getAllProducts);

router.post('/customer', ensureAuth, customerController.create);

router.put('/customer/:id', ensureAuth, customerController.update);

router.get('/customer/:id', ensureAuth, customerController.getCustomerById);

router.get('/customer', ensureAuth, customerController.getAllCustomers);

router.post('/order', orderController.create);

router.get('/order', ensureAuth, orderController.getAllOrders);

export { router };
