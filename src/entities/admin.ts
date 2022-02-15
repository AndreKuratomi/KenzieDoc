import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  isAdm: boolean;

  constructor(id: string, name: string, email: string, isAdm: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isAdm = isAdm;
  }
}
