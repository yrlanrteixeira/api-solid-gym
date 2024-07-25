import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateUseCase;

describe("Validate Check in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateUseCase(checkInsRepository);

    vi.useFakeTimers(); //MOCKING THE TIME
  });

  afterEach(() => {
    vi.useRealTimers(); //MOCKING THE TIME
  });

  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check-in after 20 minutes", async () => {
    vi.setSystemTime(new Date(2022, 0, 13, 8, 0, 0));

    const createdCheckIn = await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
