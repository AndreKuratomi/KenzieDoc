import { ProductsRepository } from "../../repositories/products.repository";
import { getCustomRepository } from "typeorm";
import { IProductParams } from "../../types";

export class RegisterProductService {
  async execute({ name, price }: IProductParams) {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findOne({ name });

    if (productExists) {
      throw new Error("Product already exists");
    }

    const newProduct = productsRepository.create({ name, price });

    await productsRepository.save(newProduct);

    return newProduct;
  }
}
