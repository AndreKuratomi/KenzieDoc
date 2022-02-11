import { EntityRepository, Repository } from "typeorm";
import { Buys } from "../entities";

@EntityRepository(Buys)
class BuysRepository extends Repository<Buys> {}

export { BuysRepository };
