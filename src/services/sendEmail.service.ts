import { UsersRepository } from "../repositories/users.repository";
import { getCustomRepository } from "typeorm";

export class SendEmailService {
  async execute(userId: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new Error("This user does not exist");
    }

    return user.email;
  }
}
