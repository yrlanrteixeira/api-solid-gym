import { Gym, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });
    return gym;
  }
  async findManyNearby(params: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) 
      * cos( radians( latitude ) ) 
      * cos( radians( longitude ) 
      - radians(${params.longitude}) ) 
      + sin( radians(${params.latitude}) ) 
      * sin( radians( latitude ) ) ) ) <= 10
    `;
    return gyms;
  }
  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });
    return gym;
  }
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    });
    return gyms;
  }
}
