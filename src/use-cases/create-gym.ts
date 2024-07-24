import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";

interface CreateGymUseCaseCaseRequest {
  title: string;
  description?: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseCaseReponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseCaseRequest): Promise<CreateGymUseCaseCaseReponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
