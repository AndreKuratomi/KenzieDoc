import { EntityRepository, Repository } from "typeorm";
import { Professional } from "../entities";

@EntityRepository(Professional)
class ProfessionalsRepository extends Repository<Professional> {}

export { ProfessionalsRepository };
