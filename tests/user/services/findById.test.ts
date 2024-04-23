import { User, UserCreationAttributes } from "../../../src/models/User";
import { userService } from "../../../src/services/userService";

describe("FindById user function", () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  it("Should be able to return detail user from id", async () => {
    const userData: UserCreationAttributes = {
      id: 1,
      name: "Paulo barbosa",
      email: "paulo_barbosa@teste.com",
      password: "12345678",
    };

    await userService.save(userData);

    const detailResult = await userService.findById(userData.id!);
    expect(detailResult).toHaveProperty("id");
    expect(detailResult).toHaveProperty("name", userData.name);
    expect(detailResult).toHaveProperty("email", userData.email);
  });
});
