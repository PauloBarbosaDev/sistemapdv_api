import { Category } from "../../../src/models";
import { CategoryCreationAttributes } from "../../../src/models/Category";
import { categoryService } from "../../../src/services/categoryService";

describe("Delete Category", () => {
  beforeEach(async () => {
    await Category.destroy({ where: {} });
  });

  it("Should be able to delete a category", async () => {
    const categoryData: CategoryCreationAttributes = {
      description: "Description test",
    };

    const category = await categoryService.save(categoryData);

    const deletionResult = await categoryService.deleteCategoryById(
      category.id!
    );
    expect(deletionResult).toBe(1);
  });
});
