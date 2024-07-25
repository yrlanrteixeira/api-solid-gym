import { expect, test, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

test("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);

    it("should be able to search for gyms", async () => {
      await gymsRepository.create({
        title: "Academia 01",
        description: null,
        phone: null,
        latitude: -23.5664307,
        longitude: -46.6026496,
      });

      await gymsRepository.create({
        title: "Academia 02",
        description: null,
        phone: null,
        latitude: -23.5664307,
        longitude: -46.6026496,
      });

      const { gyms } = await sut.execute({
        query: "Academia 01",
        page: 1,
      });

      expect(gyms).toHaveLength(1);
      expect(gyms).toEqual([expect.objectContaining({ title: "Academia 01" })]);
    });

    it("should be able to fetch paginated gym search", async () => {
      for (let i = 0; i < 22; i++) {
        await gymsRepository.create({
          title: `Academia ${i}`,
          description: null,
          phone: null,
          latitude: -23.5664307,
          longitude: -46.6026496,
        });
      }

      const { gyms } = await sut.execute({
        query: "Academia",
        page: 2,
      });

      expect(gyms).toHaveLength(2);
      expect(gyms).toEqual([
        expect.objectContaining({ title: "Academia 21" }),
        expect.objectContaining({ title: "Academia 22" }),
      ]);
    });
  });
});
