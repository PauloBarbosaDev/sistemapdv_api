import request from "supertest";
import { app } from "../../../src/app";
import { CategoryCreationAttributes } from "../../../src/models/Category";

export default async function insertCategory(
  token: string | undefined,
  category: CategoryCreationAttributes
) {
  return await request(app)
    .post("/categories")
    .set("Authorization", `Bearer ${token}`)
    .send(category);
}
