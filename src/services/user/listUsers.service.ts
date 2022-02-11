import { UsersRepository } from "../../repositories/users.repository";
import { getCustomRepository } from "typeorm";

export class ListUsersService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepository);

    const usersList = await usersRepository.find();

    return usersList;
  }
}
