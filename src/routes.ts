import express from 'express';
import { categoriesController } from './controllers/categoriesController';
import { authController } from './controllers/authController';

const router = express.Router();

router.post('/auth/register', authController.register);

router.post('/auth/login', authController.login);

router.get('/categories', categoriesController.getAllCategories);

export { router };
