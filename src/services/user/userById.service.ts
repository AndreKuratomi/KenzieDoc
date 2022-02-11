import { UsersRepository } from "../../repositories/users.repository";
import { getCustomRepository } from "typeorm";

export class UserByIdService {
  async execute(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new Error("User does not exist!");
    }

    return user;
  }
}
