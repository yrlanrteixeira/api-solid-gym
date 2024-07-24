import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExists } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseReponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRespository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseReponse> {
    const password_hash = await hash(password, 6);

    const userwithSameEmail = await this.usersRespository.findByEmail(email);

    if (userwithSameEmail) {
      throw new UserAlreadyExists();
    }

    const user = await this.usersRespository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
