import express from 'express';
import { categoriesController } from './controllers/categoriesController';
import { authController } from './controllers/authController';
import { usersController } from './controllers/usersController';
import { ensureAuth } from './middlewares/auth';
import { productController } from './controllers/productsController';
import { customerController } from './controllers/customerController';
import { orderController } from './controllers/orderController';
import loginSchema from './validation/authSchema';
import validationBody from './middlewares/validateBody';
import userSchema from './validation/userSchema';
import categoriesSchema from './validation/categoriesSchema';
import productSchema from './validation/productsSchema';
import orderSchema from './validation/orderSchema';

const router = express.Router();

router.post(
  '/auth/register',
  validationBody(userSchema),
  authController.register
);

router.post('/auth/login', validationBody(loginSchema), authController.login);

router.post(
  '/categories',
  validationBody(categoriesSchema),
  categoriesController.create
);

router.put('/categories/:id', categoriesController.update);

router.delete('/categories/:id', categoriesController.delete);

router.get('/categories/:id', categoriesController.getCategoryById);

router.get('/categories', categoriesController.getAllCategories);

router.get('/user', usersController.getuserDetail);

router.put('/user', usersController.update);

router.put('/user/password', usersController.updatePassword);

router.post('/product', validationBody(productSchema), productController.save);

router.put('/product/:id', productController.update);

router.get('/product/:id', productController.getProductById);

router.delete('/product/:id', productController.delete);

router.get('/product', productController.getAllProducts);

router.post('/customer', customerController.create);

router.put('/customer/:id', customerController.update);

router.get('/customer/:id', customerController.getCustomerById);

router.get('/customer', customerController.getAllCustomers);

router.post('/order', validationBody(orderSchema), orderController.create);

router.get('/order', orderController.getAllOrders);

// router.post('/categories', ensureAuth, categoriesController.create);

// router.put('/categories/:id', ensureAuth, categoriesController.update);

// router.delete('/categories/:id', ensureAuth, categoriesController.delete);

// router.get('/categories/:id', categoriesController.getCategoryById);

// router.get('/categories', categoriesController.getAllCategories);

// router.get('/user', ensureAuth, usersController.getuserDetail);

// router.put('/user', ensureAuth, usersController.update);

// router.put('/user/password', ensureAuth, usersController.updatePassword);

// router.post('/product', ensureAuth, productController.save);

// router.put('/product/:id', ensureAuth, productController.update);

// router.get('/product/:id', ensureAuth, productController.getProductById);

// router.delete('/product/:id', ensureAuth, productController.delete);

// router.get('/product', ensureAuth, productController.getAllProducts);

// router.post('/customer', ensureAuth, customerController.create);

// router.put('/customer/:id', ensureAuth, customerController.update);

// router.get('/customer/:id', ensureAuth, customerController.getCustomerById);

// router.get('/customer', ensureAuth, customerController.getAllCustomers);

// router.post('/order', orderController.create);

// router.get('/order', ensureAuth, orderController.getAllOrders);

export { router };
