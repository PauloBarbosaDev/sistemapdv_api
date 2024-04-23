import { User, UserCreationAttributes } from "../../../src/models/User";
import { userService } from "../../../src/services/userService";

describe("Delete user", () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  it("Should be able to delete a user", async () => {
    const userData: UserCreationAttributes = {
      id: 1,
      name: "Paulo barbosa",
      email: "paulo_barbosa@teste.com",
      password: "12345678",
    };

    await userService.save(userData);

    const deletionResult = await userService.deleteUserById(userData.id!);
    expect(deletionResult).toBe(1);
  });
});
