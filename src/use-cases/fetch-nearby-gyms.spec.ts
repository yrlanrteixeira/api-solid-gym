import { expect, test, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

test("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);

    it("should be able to fetch nearby gyms", async () => {
      await gymsRepository.create({
        title: "Near Gym",
        description: null,
        phone: null,
        latitude: -23.5664307,
        longitude: -46.6026496,
      });

      await gymsRepository.create({
        title: "Far Gym",
        description: null,
        phone: null,
        latitude: -23.4993944,
        longitude: -46.4825285,
      });

      const { gyms } = await sut.execute({
        userLatitude: -23.5664307,
        userLongitude: -46.6026496,
      });

      expect(gyms).toHaveLength(1);
      expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
    });
  });
});
