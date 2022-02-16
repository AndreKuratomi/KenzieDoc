import { EntityRepository, Repository } from "typeorm";
import { Professional } from "../entities";

@EntityRepository(Professional)
class ProfessionalRepository extends Repository<Professional> {
  public async findByEmail(email: string): Promise<Professional | undefined> {
    const professioal = await this.findOne({
      where: {
        email,
      },
    });
    return professioal;
  }
}

export default ProfessionalRepository;
