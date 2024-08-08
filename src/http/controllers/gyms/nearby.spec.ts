import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
      title: "Academia 01",
      description: "Descrição",
      phone: "31999999999",
      latitude: -23.5664307,
      longitude: -46.6026496,
    });

    await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
      title: "Academia 02",
      description: "Descrição",
      phone: "31999999999",
      latitude: -23.4993944,
      longitude: -46.4825285,
    });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -23.5664307,
        longitude: -46.6026496,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(201);
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Academia 01",
        }),
      ])
    );
  });
});
