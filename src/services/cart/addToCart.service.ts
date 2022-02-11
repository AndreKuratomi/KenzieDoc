import { getCustomRepository } from "typeorm";
import { CartsRepository } from "../../repositories/carts.repository";
import { CartsProductsRepository } from "../../repositories/carts_products.repository";
import { ProductsRepository } from "../../repositories/products.repository";

export class AddToCartService {
  async execute(productId: string, userId: string) {
    const cartsProductsRepository = getCustomRepository(
      CartsProductsRepository
    );
    const cartsRepository = getCustomRepository(CartsRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const cart = await cartsRepository.findOne({ where: { user: userId } });
    const product = await productsRepository.findOne(productId);

    const alreadyHasProduct = await cartsProductsRepository.findOne({
      cartId: cart?.id,
      productId: productId,
    });

    if (!alreadyHasProduct) {
      const connection = cartsProductsRepository.create({
        cart: cart,
        product: product,
        productQuantity: 1,
      });
      await cartsProductsRepository.save(connection);
    } else {
      await cartsProductsRepository.update(alreadyHasProduct, {
        productQuantity: alreadyHasProduct.productQuantity + 1,
      });
    }

    const cartProducts = await cartsProductsRepository.find({
      cartId: cart?.id,
    });

    return cartProducts;
  }
}
