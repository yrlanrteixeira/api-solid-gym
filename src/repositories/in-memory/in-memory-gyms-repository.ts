import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../prisma/gyms-repository";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];
  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }
    return gym;
  }

  searchMany(query: string, page: number): Promise<Gym[]> {
    return Promise.resolve(this.items.filter((item) => item.title.includes(query)).slice((page - 1) * 20, page * 20));
  }

  create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return Promise.resolve(gym);
  }
}
