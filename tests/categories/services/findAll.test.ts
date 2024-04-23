import { Category } from "../../../src/models";
import { CategoryCreationAttributes } from "../../../src/models/Category";
import { categoryService } from "../../../src/services/categoryService";

describe("Find all categories", () => {
  beforeEach(async () => {
    await Category.destroy({ where: {} });
  });

  it("should find all categories function", async () => {
    const categoryData: CategoryCreationAttributes = {
      description: "Description test",
    };
    await categoryService.save(categoryData);

    const categoryList = await categoryService.findAllCategories(1, 10);

    expect(categoryList.length).toBeGreaterThan(0);
    expect(categoryList[0]).toHaveProperty("id");
    expect(categoryList[0]).toHaveProperty(
      "description",
      categoryData.description
    );
  });
});
