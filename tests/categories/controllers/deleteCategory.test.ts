import request from "supertest";
import { app } from "../../../src/app";
import insertUserAndLogin from "../../functions/user/insertUserAndLogin";
import { category, loginUser, user } from "../../models";
import { Category, Product } from "../../../src/models";
import insertCategory from "../../functions/categories/insertCategory";

const deleteCategory = async (
  token: string | undefined,
  categoryId: number | undefined
) => {
  let requestBuilder = request(app).delete(`/categories/${categoryId}`);

  if (token) {
    requestBuilder.set("Authorization", `Bearer ${token}`);
  }

  response = await requestBuilder.send();

  return response;
};

let bearerTokenTest: string | undefined;
let categoryIdTest: number | undefined;
let response: request.Response;

describe("Delete Category Controller", () => {
  beforeEach(async () => {
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });

    const { bearerToken } = await insertUserAndLogin(user, loginUser);
    bearerTokenTest = bearerToken;

    const newCategory = await insertCategory(bearerTokenTest, category);
    categoryIdTest = newCategory.body.id;
  });

  it("Delete a Category successfully", async () => {
    await deleteCategory(bearerTokenTest, categoryIdTest);

    expect(response.statusCode).toBe(204);
  });

  it("Should return 404 if the category does not exist", async () => {
    categoryIdTest = 999;
    await deleteCategory(bearerTokenTest, categoryIdTest);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      `Category ${categoryIdTest} not found`
    );
  });

  it("Invalid token", async () => {
    const errorToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYwLCJuYW1lIjoiUGF1bG8gYmFyYm9zYSIsImVtYWlsIjoidGVzdGUyQGhvdG1hYWlsLmNvbSIsImlhdCI6MTcxMzQ5NjUyNywiZXhwIjoxNzEzNTgyOTI3fQ.8D4VgSH41zSiXH66OxId5by3fthLbvsxpFY02dtB";

    await deleteCategory(errorToken, categoryIdTest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: invalid token"
    );
  });

  it("Jwt no token found", async () => {
    let errorToken;

    await deleteCategory(errorToken, categoryIdTest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: no token found"
    );
  });
});
