import request from "supertest";
import insertUserAndLogin from "../../functions/user/insertUserAndLogin";
import { loginUser, user } from "../../models";
import { app } from "../../../src/app";

let bearerTokenTest: string | undefined;
let userIdTest: number | undefined;
let response: request.Response;

const detailUser = async (token: string | undefined) => {
  let requestBuilder = request(app).get("/user");

  if (token) {
    requestBuilder.set("Authorization", `Bearer ${token}`);
  }

  response = await requestBuilder.send();

  return response;
};

describe("Detail user controller", () => {
  beforeEach(async () => {
    const { bearerToken, userId } = await insertUserAndLogin(user, loginUser);
    bearerTokenTest = bearerToken;
    userIdTest = userId;
  });

  it("Detail a user successfully", async () => {
    await detailUser(bearerTokenTest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", user.name);
    expect(response.body).toHaveProperty("email", user.email);
  });

  it("Invalid token", async () => {
    const errorToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYwLCJuYW1lIjoiUGF1bG8gYmFyYm9zYSIsImVtYWlsIjoidGVzdGUyQGhvdG1hYWlsLmNvbSIsImlhdCI6MTcxMzQ5NjUyNywiZXhwIjoxNzEzNTgyOTI3fQ.8D4VgSH41zSiXH66OxId5by3fthLbvsxpFY02dtB";

    await detailUser(errorToken);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: invalid token"
    );
  });

  it("Jwt no token found", async () => {
    let errorToken;

    await detailUser(errorToken);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: no token found"
    );
  });
});
