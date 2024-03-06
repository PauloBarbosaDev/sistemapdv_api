import express from 'express';
import { categoriesController } from './controllers/categoriesController';
import { usersController } from './controllers/usersController';

const router = express.Router();

router.get('/categories', categoriesController.getAllCategories);

router.post('/user', usersController.save);

export { router };
