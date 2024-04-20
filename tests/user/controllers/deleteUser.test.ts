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
});
