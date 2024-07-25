import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../prisma/check-ins-repository";
import { Prisma, CheckIn } from "@prisma/client";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn[] | null> {
    const startOfDay = dayjs(date).startOf("day");
    const endOfDay = dayjs(date).endOf("day");

    const checkOnSameDate = this.items.filter((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);

      const isOnSameDay = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);

      return checkIn.user_id === userId && isOnSameDay;
    });

    if (checkOnSameDate.length === 0) {
      return null;
    }

    return checkOnSameDate;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return Promise.resolve(this.items.filter((item) => item.user_id === userId).slice((page - 1) * 20, page * 20));
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => item.id === id);

    if (!checkIn) {
      return null;
    }
    return checkIn;
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn;
    }

    return checkIn;
  }

  async countByUserId(userId: string): Promise<number> {
    return Promise.resolve(this.items.filter((item) => item.user_id === userId).length);
  }
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      gym_id: data.gym_id,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
