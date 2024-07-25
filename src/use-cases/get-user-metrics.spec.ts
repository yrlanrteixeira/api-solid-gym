import { expect, test, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

test("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);

    it("should be able get check-ins count from metrics", async () => {
      await checkInsRepository.create({
        user_id: "user-01",
        gym_id: "gym-01",
      });

      await checkInsRepository.create({
        user_id: "user-01",
        gym_id: "gym-02",
      });

      const { checkInsCount } = await sut.execute({
        userId: "user-01",
      });

      expect(checkInsCount).toHaveLength(2);
    });
  });
});
