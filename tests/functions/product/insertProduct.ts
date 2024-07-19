import request from "supertest";
import { app } from "../../../src/app";
import { ProductCreationAttributes } from "../../../src/models/Product";

export default async function insertCategory(
  token: string | undefined,
  product: ProductCreationAttributes
) {
  return await request(app)
    .post("/product")
    .set("Authorization", `Bearer ${token}`)
    .send(product);
}
