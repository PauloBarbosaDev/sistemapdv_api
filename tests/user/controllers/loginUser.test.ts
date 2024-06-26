import request from "supertest";
import { app } from "../../../src/app";
import { user } from "../../models";

type LoginUserTestParams = {
  email: string | null;
  password: string | number | null;
};

let logedUser: LoginUserTestParams;
let response: request.Response;

const loginUser = async (user: LoginUserTestParams) => {
  response = await request(app).post("/auth/login").send(user);

  return response;
};

describe("Login User Controller", () => {
  beforeEach(() => {
    logedUser = {
      email: "paulobarbosa@gmail.com",
      password: "paulob12345",
    };
  });

  beforeAll(async () => {
    await request(app).post("/auth/register").send(user);
  });

  it("Login a user successfully", async () => {
    await loginUser(logedUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("authenticated");
  });

  it("Invalid email and/or password", async () => {
    logedUser.password = "pb4234ff";

    await loginUser(logedUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "invalid email and/or password"
    );
  });

  it("Email must be a valid email", async () => {
    logedUser.email = "pauloBarbosa@";

    await loginUser(logedUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ mensagem: "email must be a valid email" });
  });

  it("Some request field missing", async () => {
    logedUser.password = null;

    await loginUser(logedUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ mensagem: "password is a required field" });
  });
});
