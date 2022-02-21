import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Appointment } from ".";

@Entity()
export class Professional {
  @PrimaryColumn({ unique: true })
  council_number: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  specialty: string;

  @Column()
  address: string;

  @OneToMany(() => Appointment, (ap) => ap.professional)
  appointments!: Appointment[];

  @Column()
  isProf: boolean;

  constructor(
    council_number: string,
    name: string,
    email: string,
    phone: string,
    password: string,
    specialty: string,
    address: string
  ) {
    this.council_number = council_number;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.specialty = specialty;
    this.address = address;
    this.isProf = true;
  }
}
