import request from "supertest";
import insertUserAndLogin from "../../functions/user/insertUserAndLogin";
import { category, loginUser, user } from "../../models";
import { app } from "../../../src/app";
import insertCategory from "../../functions/categories/insertCategory";

let bearerTokenTest: string | undefined;
let categoryIdTest: number | undefined;
let response: request.Response;

const getCategoryById = async (
  token: string | undefined,
  categoryId: number | undefined
) => {
  let requestBuilder = request(app).get(`/categories/${categoryId}`);

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
  });

  it("should get category by id", async () => {
    await getCategoryById(bearerTokenTest, categoryIdTest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description", category.description);
  });

  it("Should return 404 if the category does not exist", async () => {
    categoryIdTest = 999;
    await getCategoryById(bearerTokenTest, categoryIdTest);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      `Category ${categoryIdTest} not found`
    );
  });

  it("Invalid token", async () => {
    const errorToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYwLCJuYW1lIjoiUGF1bG8gYmFyYm9zYSIsImVtYWlsIjoidGVzdGUyQGhvdG1hYWlsLmNvbSIsImlhdCI6MTcxMzQ5NjUyNywiZXhwIjoxNzEzNTgyOTI3fQ.8D4VgSH41zSiXH66OxId5by3fthLbvsxpFY02dtB";

    await getCategoryById(errorToken, categoryIdTest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: invalid token"
    );
  });

  it("Jwt no token found", async () => {
    let errorToken;

    await getCategoryById(errorToken, categoryIdTest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: no token found"
    );
  });
});
