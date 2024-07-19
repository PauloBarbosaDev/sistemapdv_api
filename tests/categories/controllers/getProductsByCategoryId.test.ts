import request from "supertest";
import insertUserAndLogin from "../../functions/user/insertUserAndLogin";
import { category, loginUser, user } from "../../models";
import { app } from "../../../src/app";
import insertCategory from "../../functions/categories/insertCategory";
import insertProduct from "../../functions/product/insertProduct";

let bearerTokenTest: string | undefined;
let categoryIdTest: number;
let response: request.Response;

const getProductsByCategoryId = async (
  token: string | undefined,
  categoryId: number | undefined
) => {
  let requestBuilder = request(app).get(`/categories/${categoryId}/products`);

  if (token) {
    requestBuilder.set("Authorization", `Bearer ${token}`);
  }

  response = await requestBuilder.send();

  return response;
};

describe("Categories controller", () => {
  beforeEach(async () => {
    const { bearerToken } = await insertUserAndLogin(user, loginUser);
    bearerTokenTest = bearerToken;

    const newCategory = await insertCategory(bearerTokenTest, category);
    categoryIdTest = newCategory.body.id;

    await insertProduct(bearerTokenTest, {
      category_id: categoryIdTest,
      description: "Description test",
      quantity_stock: 20,
      value: 50000,
    });
  });

  it("should get all products by category id", async () => {
    await getProductsByCategoryId(bearerTokenTest, categoryIdTest);

    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("quantity_stock");
    expect(response.body[0]).toHaveProperty("value");
  });

  it("Should return 404 if the category does not exist", async () => {
    categoryIdTest = 999;
    await getProductsByCategoryId(bearerTokenTest, categoryIdTest);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      `Category ${categoryIdTest} not found`
    );
  });

  it("Invalid token", async () => {
    const errorToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYwLCJuYW1lIjoiUGF1bG8gYmFyYm9zYSIsImVtYWlsIjoidGVzdGUyQGhvdG1hYWlsLmNvbSIsImlhdCI6MTcxMzQ5NjUyNywiZXhwIjoxNzEzNTgyOTI3fQ.8D4VgSH41zSiXH66OxId5by3fthLbvsxpFY02dtB";

    await getProductsByCategoryId(errorToken, categoryIdTest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: invalid token"
    );
  });

  it("Jwt no token found", async () => {
    let errorToken;

    await getProductsByCategoryId(errorToken, categoryIdTest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: no token found"
    );
  });
});
