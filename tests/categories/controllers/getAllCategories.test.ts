import request from "supertest";
import insertUserAndLogin from "../../functions/user/insertUserAndLogin";
import { category, category2, loginUser, user } from "../../models";
import { app } from "../../../src/app";
import insertCategory from "../../functions/categories/insertCategory";

let bearerTokenTest: string | undefined;
let response: request.Response;

const getAllCategories = async (token: string | undefined) => {
  let requestBuilder = request(app).get("/categories");

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

    await insertCategory(bearerTokenTest, category);
    await insertCategory(bearerTokenTest, category2);
  });

  it("should get all categories", async () => {
    await getAllCategories(bearerTokenTest);

    expect(response.statusCode).toBe(200);
    expect(response.body.categories).toBeInstanceOf(Array);
    expect(response.body.categories.length).toBeGreaterThan(0);
    expect(response.body.categories[0]).toHaveProperty("id");
    expect(response.body.categories[0]).toHaveProperty("description");
  });

  it("Invalid token", async () => {
    const errorToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYwLCJuYW1lIjoiUGF1bG8gYmFyYm9zYSIsImVtYWlsIjoidGVzdGUyQGhvdG1hYWlsLmNvbSIsImlhdCI6MTcxMzQ5NjUyNywiZXhwIjoxNzEzNTgyOTI3fQ.8D4VgSH41zSiXH66OxId5by3fthLbvsxpFY02dtB";

    await getAllCategories(errorToken);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: invalid token"
    );
  });

  it("Jwt no token found", async () => {
    let errorToken;

    await getAllCategories(errorToken);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: no token found"
    );
  });
});
