import { UsersRepository } from "../../repositories/users.repository";
import { getCustomRepository } from "typeorm";
import { IUserParams } from "../../types";
import { CartsRepository } from "../../repositories/carts.repository";
import bcryptjs from "bcryptjs";

export class CreateUserService {
  async execute({ name, email, passwordToHash, isAdm }: IUserParams) {
    const usersRepository = getCustomRepository(UsersRepository);
    const cartsRepository = getCustomRepository(CartsRepository);

    const userExists = await usersRepository.findOne({ email });

    if (userExists) {
      throw new Error("E-mail already in use");
    }

    const password = await bcryptjs.hash(passwordToHash, 10);

    const data = { name, password, email, isAdm };

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    const cart = cartsRepository.create({ user });
    await cartsRepository.save(cart);

    return user;
  }
}
