import express from 'express';
import { categoriesController } from './controllers/categoriesController';
import { authController } from './controllers/authController';
import { usersController } from './controllers/usersController';
import { ensureAuth } from './middlewares/auth';

const router = express.Router();

router.post('/auth/register', authController.register);

router.post('/auth/login', authController.login);

router.get('/categories', categoriesController.getAllCategories);

router.get('/user', ensureAuth, usersController.getuserDetail);

router.put('/user', ensureAuth, usersController.update);

router.put('/user/password', ensureAuth, usersController.updatePassword);

export { router };
