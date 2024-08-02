import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
    console.info("App is ready");
  });

  afterAll(async () => {
    await app.close();
    console.info("App is closed");
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "Debug Teixeira",
      email: "debugteixeira@example.com",
      password: "123456",
    });
    console.info(response.body);
    expect(response.status).toEqual(201);
  });
});
