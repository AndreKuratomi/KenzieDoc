import { getCustomRepository } from "typeorm";
import { Cart } from "../../entities";
import { BuysRepository } from "../../repositories/buys.repository";
import { CartsRepository } from "../../repositories/carts.repository";
import { CartsProductsRepository } from "../../repositories/carts_products.repository";
import { ProductsRepository } from "../../repositories/products.repository";

export class FinishShoppingService {
  async execute(userId: string) {
    const buysRepository = getCustomRepository(BuysRepository);
    const cartsProductsRepository = getCustomRepository(
      CartsProductsRepository
    );
    const productsRepository = getCustomRepository(ProductsRepository);
    const cartsRepository = getCustomRepository(CartsRepository);
    const cart = await cartsRepository.findOne({ where: { user: userId } });

    if (!cart) {
      throw new Error("This cart does not exist");
    }

    const productsList = await cartsProductsRepository.find({
      cartId: cart.id,
    });

    let total = 0;
    let list = [];

    for (const cp of productsList) {
      const item = await productsRepository.findOne(cp.productId);

      if (item) {
        list.push(item);
        total += item.price * cp.productQuantity;
      }
    }

    const newBuy = {
      productsList: list,
      total: total,
    };

    const buy = buysRepository.create(newBuy);

    await buysRepository.save(buy);

    return buy;
  }
}
