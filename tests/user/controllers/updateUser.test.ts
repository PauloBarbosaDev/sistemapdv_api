import request from "supertest";
import { app } from "../../../src/app";
import { User } from "../../../src/models";
import insertUserAndLogin from "../../functions/user/insertUserAndLogin";
import { user } from "../../models";
import { loginUser } from "../../models/user/LoginModel";

type UpdateUserTestParams = {
  name: string | null;
  email: string | null;
  password: string | null;
};

let updatedUser: UpdateUserTestParams;
let bearerTokenTest: string | undefined;
let userIdTest: number | undefined;
let response: request.Response;

const updateUser = async (
  token: string | undefined,
  userId: number | undefined,
  user: UpdateUserTestParams
) => {
  let requestBuilder = request(app).put(`/user/${userId}`);

  if (token) {
    requestBuilder = requestBuilder.set("Authorization", `Bearer ${token}`);
  }

  response = await requestBuilder.send(user);

  return response;
};

describe("Update User Controller", () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });

    updatedUser = {
      name: "paulo barbosanovo",
      email: "paulobarbosanovo@gmail.com",
      password: "testenovo123n",
    };

    const { bearerToken, userId } = await insertUserAndLogin(user, loginUser);
    bearerTokenTest = bearerToken;
    userIdTest = userId;
  });

  it("Update a user successfully", async () => {
    await updateUser(bearerTokenTest, userIdTest, updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email", updatedUser.email);
  });

  it("Should not be able to create a new user with an email already in use", async () => {
    updatedUser.email = "paulobarbosa@gmail.com";

    await updateUser(bearerTokenTest, userIdTest, updatedUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "Email is already in use.");
  });

  it("Password must be at least 8 characters", async () => {
    updatedUser.password = "123456";

    await updateUser(bearerTokenTest, userIdTest, updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "mensagem",
      "password must be at least 8 characters"
    );
  });

  it("Email must be a valid email", async () => {
    updatedUser.email = "Paulobarbosa@";

    await updateUser(bearerTokenTest, userIdTest, updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "mensagem",
      "email must be a valid email"
    );
  });

  it("Invalid token", async () => {
    const errorToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYwLCJuYW1lIjoiUGF1bG8gYmFyYm9zYSIsImVtYWlsIjoidGVzdGUyQGhvdG1hYWlsLmNvbSIsImlhdCI6MTcxMzQ5NjUyNywiZXhwIjoxNzEzNTgyOTI3fQ.8D4VgSH41zSiXH66OxId5by3fthLbvsxpFY02dtB";

    await updateUser(errorToken, userIdTest, updatedUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: invalid token"
    );
  });

  it("Jwt no token found", async () => {
    let errorToken;

    await updateUser(errorToken, userIdTest, updatedUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: no token found"
    );
  });

  it("Should not be able to update a user without a name", async () => {
    updatedUser.name = null;

    await updateUser(bearerTokenTest, userIdTest, updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ mensagem: "name is a required field" });
  });

  it("Should not be able to create a new user without a email", async () => {
    updatedUser.email = null;

    await updateUser(bearerTokenTest, userIdTest, updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ mensagem: "email is a required field" });
  });

  it("Should not be able to create a new user without a password", async () => {
    updatedUser.password = null;

    await updateUser(bearerTokenTest, userIdTest, updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ mensagem: "password is a required field" });
  });
});
