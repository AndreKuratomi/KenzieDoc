import { getCustomRepository } from "typeorm";
import { CartsRepository } from "../../repositories/carts.repository";
import { CartsProductsRepository } from "../../repositories/carts_products.repository";

export class DeleteFromCartService {
  async execute(userId: string, productId: string) {
    const cartsRepository = getCustomRepository(CartsRepository);
    const cartsProductsRepository = getCustomRepository(
      CartsProductsRepository
    );
    const cart = await cartsRepository.findOne({ where: { user: userId } });

    if (!cart) {
      throw new Error("This cart does not exist");
    }

    const productExists = await cartsProductsRepository.findOne({
      cartId: cart.id,
      productId: productId,
    });

    if (!productExists) {
      throw new Error("This product is not in this cart");
    }

    if (productExists.productQuantity === 1) {
      await cartsProductsRepository.delete(productExists);
    }

    await cartsProductsRepository.update(productExists, {
      productQuantity: productExists.productQuantity - 1,
    });

    const updatedCart = await cartsProductsRepository.find({
      where: { cartId: cart.id },
    });

    return updatedCart;
  }
}
