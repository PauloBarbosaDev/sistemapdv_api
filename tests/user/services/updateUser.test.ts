import { User, UserCreationAttributes } from "../../../src/models/User";
import { userService } from "../../../src/services/userService";

describe("Update user", () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  it("Should be able to update user", async () => {
    const userData: UserCreationAttributes = {
      name: "Test Name",
      email: "paulobarbosa@testnovo.com.br",
      password: "12345678",
    };

    const editedUserData: UserCreationAttributes = {
      name: "Paulo barbosa",
      email: "paulobarbosatest@gmail.com",
      password: "12345962test",
    };

    const user = await userService.create(userData);

    const editedUser = await userService.update(user.id, editedUserData);

    expect(editedUser).toHaveProperty("id");
    expect(editedUser).toHaveProperty("name", editedUser.name);
    expect(editedUser).toHaveProperty("email", editedUser.email);
  });

  it("Should not be able to update a user with an existing email", async () => {
    const userData: UserCreationAttributes = {
      name: "Test Name",
      email: "paulobarbosa@testnovo.com.br",
      password: "12345678",
    };
    await userService.create(userData);

    await expect(userService.create(userData)).rejects.toEqual(
      new Error("Validation error")
    );
  });
});
