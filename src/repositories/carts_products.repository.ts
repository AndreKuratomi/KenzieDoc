import { EntityRepository, Repository } from "typeorm";
import { CartsProducts } from "../entities/carts_products.entity";

@EntityRepository(CartsProducts)
class CartsProductsRepository extends Repository<CartsProducts> {}

export { CartsProductsRepository };
