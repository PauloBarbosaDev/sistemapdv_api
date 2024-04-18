import request from "supertest";
import { User } from "../../../src/models";
import { app } from "../../../src/app";

type InsertUserTestParams = {
  name: string | null;
  email: string | null;
  password: string | null;
};

let user: InsertUserTestParams;
let response: request.Response;

const createUser = async (user: InsertUserTestParams) => {
  response = await request(app).post("/auth/register").send(user);

  return response;
};

describe("Create User Controller", () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });

    user = {
      name: "Paulo Barbosa",
      email: "paulo_barbosa_9333@outlook.com",
      password: "testeNewUser",
    };
  });

  it("Should be able to create a new user", async () => {
    await createUser(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", user.name);
    expect(response.body).toHaveProperty("email", user.email);
  });

  it("Password must be at least 8 characters ", async () => {
    user.password = "123456";

    await createUser(user);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      mensagem: "password must be at least 8 characters",
    });
  });

  it("Email must be a valid email", async () => {
    user.email = "paulob@";

    await createUser(user);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ mensagem: "email must be a valid email" });
  });

  it("Should not be able to create a new user without a name", async () => {
    user.name = null;

    await createUser(user);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ mensagem: "name is a required field" });
  });

  it("Should not be able to create a new user without a password", async () => {
    user.password = null;

    await createUser(user);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ mensagem: "password is a required field" });
  });
});
