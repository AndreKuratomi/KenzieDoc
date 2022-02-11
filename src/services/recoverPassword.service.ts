import { UsersRepository } from "../repositories/users.repository";
import { getCustomRepository } from "typeorm";
import { resolve } from "path/posix";

export class RecoverPasswordService {
  async execute(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ where: { email: email } });

    if (!user) {
      throw new Error("User does not exist");
    }

    return user;
  }
}
