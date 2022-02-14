import { EntityRepository, Repository } from "typeorm";
import { Appointment } from "../entities";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {}

export { AppointmentsRepository };
