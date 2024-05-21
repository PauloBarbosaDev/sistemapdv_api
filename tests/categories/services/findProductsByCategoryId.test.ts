import { Category, Product } from "../../../src/models";
import { CategoryCreationAttributes } from "../../../src/models/Category";
import { ProductCreationAttributes } from "../../../src/models/Product";
import { categoryService } from "../../../src/services/categoryService";
import { productService } from "../../../src/services/productService";

describe("FindProductsByCategoryId function", () => {
  beforeEach(async () => {
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });
  });

  it("Should be able to return products from category", async () => {
    const categoryData: CategoryCreationAttributes = {
      description: "Description test",
    };

    const category = await categoryService.save(categoryData);

    const productData: ProductCreationAttributes = {
      category_id: category.id,
      description: "Cama de casal",
      quantity_stock: 10,
      value: 20000,
    };

    const product = await productService.save(productData);

    const detailResult = await categoryService.findProductsByCategoryId(
      category.id
    );

    expect(detailResult.length).toBeGreaterThan(0);
    expect(detailResult[0]).toHaveProperty("id");
    expect(detailResult[0]).toHaveProperty("description", product.description);
    expect(detailResult[0]).toHaveProperty("category_id", product.category_id);
    expect(detailResult[0]).toHaveProperty(
      "quantity_stock",
      product.quantity_stock
    );
    expect(detailResult[0]).toHaveProperty("value", product.value);
  });
});
