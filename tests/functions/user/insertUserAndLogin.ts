import request from "supertest";
import { app } from "../../../src/app";
import { UserCreationAttributes } from "../../../src/models/User";
import { LoginUserParams } from "../../../src/middlewares/auth";

let bearerToken: string | undefined;
let userId: number | undefined;

export default async function insertUserAndLogin(
  user: UserCreationAttributes,
  loginUser: LoginUserParams
) {
  await request(app).post("/auth/register").send(user);

  const tokenReq = await request(app).post("/auth/login").send(loginUser);
  bearerToken = tokenReq.body.token;
  userId = tokenReq.body.id;
  return { bearerToken, userId };
}
