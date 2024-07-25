import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "@/use-cases/fetch-user-check-ins-history";
import { ValidateUseCase } from "@/use-cases/validate-check-in";

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateUseCase(checkInsRepository);

  return useCase;
}
