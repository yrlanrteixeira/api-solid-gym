import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./checkin";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckIn } from "@prisma/client";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();

    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-01",
      title: "Academia 01",
      phone: "",
      description: "",
      latitude: new Decimal(-23.5664307),
      longitude: new Decimal(-46.6026496),
    });
    vi.useFakeTimers(); //MOCKING THE TIME
  });

  afterEach(() => {
    vi.useRealTimers(); //MOCKING THE TIME
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5664307,
      userLongitude: -46.6026496,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 13, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5664307,
      userLongitude: -46.6026496,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -23.5664307,
        userLongitude: -46.6026496,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but on different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 13, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5664307,
      userLongitude: -46.6026496,
    });

    vi.setSystemTime(new Date(2022, 0, 14, 8, 0, 0));

    await expect(
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -23.5664307,
        userLongitude: -46.6026496,
      })
    ).resolves.toBeTruthy();
  });

  it("should not to be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Academia 02",
      phone: "",
      description: "",
      latitude: new Decimal(-23.4993944),
      longitude: new Decimal(-46.4825285),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -23.5664307,
        userLongitude: -46.6026496,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
