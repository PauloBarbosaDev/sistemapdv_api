import { UserCreationAttributes } from "../../../src/models/User";

const user: UserCreationAttributes = {
  name: "Paulo Barbosa",
  email: "paulobarbosa@gmail.com",
  password: "paulob12345",
};

const user2: UserCreationAttributes = {
  name: "Paulo Barbosa",
  email: "pauloBarbosa2@gmail.com",
  password: "12345678",
};

export { user, user2 };
