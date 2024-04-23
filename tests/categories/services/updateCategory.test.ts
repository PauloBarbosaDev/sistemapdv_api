import { Category } from "../../../src/models";
import { CategoryCreationAttributes } from "../../../src/models/Category";
import { categoryService } from "../../../src/services/categoryService";

describe("Update Category", () => {
  beforeEach(async () => {
    await Category.destroy({ where: {} });
  });

  it("Should be able to update a category", async () => {
    const categoryData: CategoryCreationAttributes = {
      description: "Description test",
    };

    const editedCategoryData: CategoryCreationAttributes = {
      description: "Description test trocado",
    };

    const category = await categoryService.save(categoryData);

    const editedCategory = await categoryService.update(
      category.id,
      editedCategoryData
    );

    expect(editedCategory).toHaveProperty("id");
    expect(editedCategory).toHaveProperty(
      "description",
      editedCategory.description
    );
  });
});
