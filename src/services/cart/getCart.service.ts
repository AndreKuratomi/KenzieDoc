import { getCustomRepository } from "typeorm";
import { CartsRepository } from "../../repositories/carts.repository";
import { CartsProductsRepository } from "../../repositories/carts_products.repository";

export class GetCartService {
  async execute(userId: string) {
    const cartsRepository = getCustomRepository(CartsRepository);
    const cartsProductsRepository = getCustomRepository(
      CartsProductsRepository
    );

    const cart = await cartsRepository.findOne({ where: { user: userId } });

    if (!cart) {
      throw new Error("This cart does not exist");
    }

    const cartProducts = await cartsProductsRepository.find({
      cartId: cart.id,
    });

    return cartProducts;
  }
}
