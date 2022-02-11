import { UsersRepository } from "../repositories/users.repository";
import { getCustomRepository } from "typeorm";
import * as bcryptjs from "bcryptjs";

export class ChangePasswordService {
  async execute(code: string, newPassword: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { resetCode: code } });
    if (!user) {
      throw new Error("This user does not exist");
    }

    user.password = await bcryptjs.hash(newPassword, 10);

    await usersRepository.update(user.id, user);

    return user;
  }
}
