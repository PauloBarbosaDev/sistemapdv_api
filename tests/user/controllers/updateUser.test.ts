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
  response = await request(app)
    .put(`/user/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .send(user);

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
});
