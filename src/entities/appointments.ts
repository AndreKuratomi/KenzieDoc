import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Patient, Professional } from ".";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Professional, (professional) => professional.appointments, {
    cascade: true,
  })
  @JoinColumn()
  professional!: Professional;

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    cascade: true,
  })
  @JoinColumn()
  patient!: Patient;

  @Column()
  date: Date;

  @Column()
  prescription: string;

  @Column()
  finished: boolean;

  constructor(
    professional: Professional,
    patient: Patient,
    date: Date,
    finished: boolean
  ) {
    this.professional = professional;
    this.patient = patient;
    this.date = date;
    this.finished = finished;
    this.prescription = "";
  }
}
