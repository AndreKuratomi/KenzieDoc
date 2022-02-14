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

  @ManyToOne(() => Professional)
  @JoinColumn({ name: "professionalId" })
  professional!: Professional;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "patientId" })
  patient!: Patient;

  @Column()
  date: Date;

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
  }
}
