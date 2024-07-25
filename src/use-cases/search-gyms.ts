import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymsUseCaseReponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseReponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
