import request from "supertest";
import { app } from "../../../src/app";
import insertUserAndLogin from "../../functions/user/insertUserAndLogin";
import { loginUser, user } from "../../models";
import { User } from "../../../src/models";

const deleteUser = async (
  token: string | undefined,
  userId: number | undefined
) => {
  let requestBuilder = request(app).delete(`/user/${userId}`);

  if (token) {
    requestBuilder.set("Authorization", `Bearer ${token}`);
  }

  response = await requestBuilder.send();

  return response;
};

let bearerTokenTest: string | undefined;
let userIdTest: number | undefined;
let response: request.Response;

describe("Delete User Controller", () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });

    const { bearerToken, userId } = await insertUserAndLogin(user, loginUser);
    bearerTokenTest = bearerToken;
    userIdTest = userId;
  });

  it("Delete a user successfully", async () => {
    await deleteUser(bearerTokenTest, userIdTest);

    expect(response.statusCode).toBe(204);
  });

  it("Invalid token", async () => {
    const errorToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYwLCJuYW1lIjoiUGF1bG8gYmFyYm9zYSIsImVtYWlsIjoidGVzdGUyQGhvdG1hYWlsLmNvbSIsImlhdCI6MTcxMzQ5NjUyNywiZXhwIjoxNzEzNTgyOTI3fQ.8D4VgSH41zSiXH66OxId5by3fthLbvsxpFY02dtB";

    await deleteUser(errorToken, userIdTest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: invalid token"
    );
  });

  it("Jwt no token found", async () => {
    let errorToken;

    await deleteUser(errorToken, userIdTest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: no token found"
    );
  });
});
