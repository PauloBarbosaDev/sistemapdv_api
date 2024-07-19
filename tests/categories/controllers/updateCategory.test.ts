import request from "supertest";
import { app } from "../../../src/app";
import { Category, Product } from "../../../src/models";
import insertUserAndLogin from "../../functions/user/insertUserAndLogin";
import { category, user } from "../../models";
import { loginUser } from "../../models/user/LoginModel";
import insertCategory from "../../functions/categories/insertCategory";

type UpdateCategoryTestParams = {
  description: string | null;
};

let updatedCategory: UpdateCategoryTestParams;
let categoryIdTest: number | undefined;
let bearerTokenTest: string | undefined;
let response: request.Response;

const updateCategory = async (
  token: string | undefined,
  categoryId: number | undefined,
  category: UpdateCategoryTestParams
) => {
  let requestBuilder = request(app).put(`/categories/${categoryId}`);

  if (token) {
    requestBuilder = requestBuilder.set("Authorization", `Bearer ${token}`);
  }

  response = await requestBuilder.send(category);

  return response;
};

describe("Update Category Controller", () => {
  beforeEach(async () => {
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });

    updatedCategory = {
      description: "Description teste",
    };

    const { bearerToken } = await insertUserAndLogin(user, loginUser);
    bearerTokenTest = bearerToken;

    const newCategory = await insertCategory(bearerTokenTest, category);
    categoryIdTest = newCategory.body.id;
  });

  it("Update a Category successfully", async () => {
    await updateCategory(bearerTokenTest, categoryIdTest, updatedCategory);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty(
      "description",
      updatedCategory.description
    );
  });

  it("Invalid token", async () => {
    const errorToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYwLCJuYW1lIjoiUGF1bG8gYmFyYm9zYSIsImVtYWlsIjoidGVzdGUyQGhvdG1hYWlsLmNvbSIsImlhdCI6MTcxMzQ5NjUyNywiZXhwIjoxNzEzNTgyOTI3fQ.8D4VgSH41zSiXH66OxId5by3fthLbvsxpFY02dtB";

    await updateCategory(errorToken, categoryIdTest, updatedCategory);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: invalid token"
    );
  });

  it("Jwt no token found", async () => {
    let errorToken;

    await updateCategory(errorToken, categoryIdTest, updatedCategory);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: no token found"
    );
  });

  it("Should not be able to update a category without a description", async () => {
    updatedCategory.description = null;

    await updateCategory(bearerTokenTest, categoryIdTest, updatedCategory);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "notNull Violation: Category.description cannot be null",
    });
  });

  it("Should return 404 if the category does not exist", async () => {
    categoryIdTest = 999;
    await updateCategory(bearerTokenTest, categoryIdTest, updatedCategory);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      `Category ${categoryIdTest} not found`
    );
  });
});
