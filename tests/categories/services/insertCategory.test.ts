import { Category } from "../../../src/models";
import { CategoryCreationAttributes } from "../../../src/models/Category";
import { categoryService } from "../../../src/services/categoryService";

describe("Create category", () => {
  beforeEach(async () => {
    await Category.destroy({ where: {} });
  });

  it("Should be able to create a new category", async () => {
    const categoryData: CategoryCreationAttributes = {
      description: "Description test",
    };

    const category = await categoryService.save(categoryData);

    expect(category).toHaveProperty("id");
    expect(category).toHaveProperty("description", category.description);
  });
});
