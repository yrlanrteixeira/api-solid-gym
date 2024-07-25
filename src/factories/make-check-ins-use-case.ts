import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "@/use-cases/checkin";

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gyms = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gyms);

  return useCase;
}
