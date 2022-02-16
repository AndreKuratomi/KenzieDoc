import { EntityRepository, Repository } from "typeorm";
import { Admin } from "../entities";

@EntityRepository(Admin)
class AdminRepository extends Repository<Admin> {
  public async findByEmail(email: string): Promise<Admin | undefined> {
    const admin = await this.findOne({
      where: {
        email,
      },
    });
    return admin;
  }
}
export default AdminRepository;
