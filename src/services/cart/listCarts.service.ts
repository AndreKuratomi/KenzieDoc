import { getCustomRepository } from "typeorm";
import { CartsRepository } from "../../repositories/carts.repository";

export class ListCartsService {
  async execute() {
    const cartsRepository = getCustomRepository(CartsRepository);

    const cartsList = await cartsRepository.find();

    return cartsList;
  }
}
