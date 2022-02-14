import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Appointment } from ".";

@Entity()
export class Patient {
  @PrimaryColumn()
  cpf: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  sex: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  health_plan: string;

  @OneToMany(() => Appointment, (ap) => ap.patient)
  appointments!: Appointment[];

  constructor(
    cpf: string,
    name: string,
    age: number,
    sex: string,
    email: string,
    password: string,
    phone: string,
    health_plan: string
  ) {
    this.cpf = cpf;
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.health_plan = health_plan;
  }
}
