import express from 'express';
import { categoriesController } from './controllers/categoriesController';
import { authController } from './controllers/authController';
import { usersController } from './controllers/usersController';
import { ensureAuth } from './middlewares/auth';
import { productController } from './controllers/productsController';

const router = express.Router();

router.post('/auth/register', authController.register);

router.post('/auth/login', authController.login);

router.get('/categories/:id', categoriesController.getCategoryById);

router.get('/categories', categoriesController.getAllCategories);

router.get('/user', ensureAuth, usersController.getuserDetail);

router.put('/user', ensureAuth, usersController.update);

router.put('/user/password', ensureAuth, usersController.updatePassword);

router.post('/product', productController.save);

export { router };
