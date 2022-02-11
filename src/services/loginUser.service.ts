import { UsersRepository } from "../repositories/users.repository";
import { getCustomRepository } from "typeorm";
import * as bcryptjs from "bcryptjs";

export class LoginUserService {
  async execute(email: string, password: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new Error("This user does not exist");
    }
    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
      throw new Error("Incorrect e-mail/password combination");
    }

    return user;
  }
}
