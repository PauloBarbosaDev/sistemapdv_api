import request from "supertest";
import { Category } from "../../../src/models";
import { app } from "../../../src/app";
import insertUserAndLogin from "../../functions/user/insertUserAndLogin";
import { loginUser, user } from "../../models";

type InsertCategoryTestParams = {
  description: string | null;
};

let category: InsertCategoryTestParams;
let bearerTokenTest: string | undefined;
let response: request.Response;

const insertCategory = async (
  token: string | undefined,
  category: InsertCategoryTestParams
) => {
  let requestBuilder = request(app).post(`/categories`);

  if (token) {
    requestBuilder = requestBuilder.set("Authorization", `Bearer ${token}`);
  }

  response = await requestBuilder.send(category);

  return response;
};

describe("Create Category Controller", () => {
  beforeEach(async () => {
    await Category.destroy({ where: {} });

    category = {
      description: `Description test`,
    };

    const { bearerToken } = await insertUserAndLogin(user, loginUser);
    bearerTokenTest = bearerToken;
  });

  it("Should be able to create a new category", async () => {
    await insertCategory(bearerTokenTest, category);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description", category.description);
  });

  it("Should not be able to create a new category without a description", async () => {
    category.description = null;

    await insertCategory(bearerTokenTest, category);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      mensagem: "description is a required field",
    });
  });

  it("Invalid token", async () => {
    const errorToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYwLCJuYW1lIjoiUGF1bG8gYmFyYm9zYSIsImVtYWlsIjoidGVzdGUyQGhvdG1hYWlsLmNvbSIsImlhdCI6MTcxMzQ5NjUyNywiZXhwIjoxNzEzNTgyOTI3fQ.8D4VgSH41zSiXH66OxId5by3fthLbvsxpFY02dtB";

    await insertCategory(errorToken, category);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: invalid token"
    );
  });

  it("Jwt no token found", async () => {
    let errorToken;

    await insertCategory(errorToken, category);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: no token found"
    );
  });
});
