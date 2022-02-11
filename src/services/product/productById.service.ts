import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/products.repository";

export class ProductByIdService {
  async execute(id: string) {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new Error("Product does not exist");
    }

    return product;
  }
}
