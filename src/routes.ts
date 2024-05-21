import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { authController } from "./controllers/authController";
import { usersController } from "./controllers/usersController";
import { ensureAuth } from "./middlewares/auth";
import { productController } from "./controllers/productsController";
import { customerController } from "./controllers/customerController";
import { orderController } from "./controllers/orderController";
import loginSchema from "./validation/authSchema";
import validationBody from "./middlewares/validateBody";
import userSchema from "./validation/userSchema";
import categoriesSchema from "./validation/categoriesSchema";
import productSchema from "./validation/productsSchema";
import orderSchema from "./validation/orderSchema";

const router = express.Router();

router.post(
  "/auth/register",
  validationBody(userSchema),
  authController.register
);

router.post("/auth/login", validationBody(loginSchema), authController.login);

router.post(
  "/categories",
  validationBody(categoriesSchema),
  ensureAuth,
  categoriesController.create
);

router.put("/categories/:id", ensureAuth, categoriesController.update);

router.delete("/categories/:id", ensureAuth, categoriesController.delete);

router.get("/categories/:id", ensureAuth, categoriesController.getCategoryById);

router.get("/categories", ensureAuth, categoriesController.getAllCategories);

router.get(
  "/categories/:id/products",
  ensureAuth,
  categoriesController.getProductsByCategoryId
);

router.get("/user", ensureAuth, usersController.getuserDetail);

router.put(
  "/user/:id",
  ensureAuth,
  validationBody(userSchema),
  usersController.update
);

router.delete("/user/:id", ensureAuth, usersController.delete);

router.put("/user/password", ensureAuth, usersController.updatePassword);

router.post(
  "/product",
  validationBody(productSchema),
  ensureAuth,
  productController.save
);

router.put("/product/:id", ensureAuth, productController.update);

router.get("/product/:id", ensureAuth, productController.getProductById);

router.delete("/product/:id", ensureAuth, productController.delete);

router.get("/product", ensureAuth, productController.getAllProducts);

router.post("/customer", ensureAuth, customerController.create);

router.put("/customer/:id", ensureAuth, customerController.update);

router.get("/customer/:id", ensureAuth, customerController.getCustomerById);

router.get("/customer", ensureAuth, customerController.getAllCustomers);

router.post(
  "/order",
  ensureAuth,
  validationBody(orderSchema),
  orderController.create
);

router.get("/order", ensureAuth, orderController.getAllOrders);

export { router };
