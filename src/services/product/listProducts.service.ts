import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/products.repository";

export class ListProductsService {
  async execute() {
    const productsRepository = getCustomRepository(ProductsRepository);

    const productsList = await productsRepository.find();

    return productsList;
  }
}
