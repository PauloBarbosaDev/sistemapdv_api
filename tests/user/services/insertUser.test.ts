import { User, UserCreationAttributes } from "../../../src/models/User";
import { userService } from "../../../src/services/userService";

describe("Create user", () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  it("Should be able to create a new user", async () => {
    const userData: UserCreationAttributes = {
      name: "Test Name",
      email: "paulobarbosa@testnovo.com.br",
      password: "12345678",
    };

    const user = await userService.save(userData);

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create an existing user", async () => {
    const userData: UserCreationAttributes = {
      name: "Test Name",
      email: "paulobarbosa@testnovo.com.br",
      password: "12345678",
    };
    await userService.save(userData);

    await expect(userService.save(userData)).rejects.toEqual(
      new Error("Validation error")
    );
  });
});
