import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Cart } from ".";
import { ICart } from "../types";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdm: boolean;

  @Column({ nullable: true })
  resetCode?: string;

  @OneToOne((type) => Cart, (cart) => cart.user, { cascade: true })
  cart!: Cart;

  constructor(name: string, email: string, password: string, isAdm: boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdm = isAdm;
  }
}
