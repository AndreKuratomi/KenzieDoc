import { EntityRepository, Repository } from "typeorm";
import { Patient } from "../entities";

@EntityRepository(Patient)
class PatientRepository extends Repository<Patient> {
  public async findByEmail(email: string): Promise<Patient | undefined> {
    const patient = await this.findOne({
      where: {
        email,
      },
    });
    return patient;
  }
}

export default PatientRepository;
