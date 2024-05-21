import { ProductCreationAttributes } from "../../../src/models/Product";

const product: ProductCreationAttributes = {
  category_id: 1,
  description: "Produto para carros",
  quantity_stock: 5,
  value: 5000,
};

const product2: ProductCreationAttributes = {
  category_id: 1,
  description: "Produto para limpeza",
  quantity_stock: 10,
  value: 15000,
};

export { product, product2 };
