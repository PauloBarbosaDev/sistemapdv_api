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

    console.log(response.body);
    console.log(response.statusCode);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email", updatedUser.email);
  });
});
