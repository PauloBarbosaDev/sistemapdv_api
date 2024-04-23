import { Category } from "../../../src/models";
import { CategoryCreationAttributes } from "../../../src/models/Category";
import { categoryService } from "../../../src/services/categoryService";

describe("FindById category function", () => {
  beforeEach(async () => {
    await Category.destroy({ where: {} });
  });

  it("Should be able to return detail category from id", async () => {
    const categoryData: CategoryCreationAttributes = {
      description: "Description test",
    };

    const category = await categoryService.save(categoryData);

    const detailResult = await categoryService.findCategoryById(category.id);
    expect(detailResult).toHaveProperty("id");
    expect(detailResult).toHaveProperty(
      "description",
      categoryData.description
    );
  });
});
