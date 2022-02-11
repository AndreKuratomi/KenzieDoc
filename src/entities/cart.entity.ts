import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { Product, User } from ".";
import { CartsProducts } from "./carts_products.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToMany(() => CartsProducts, (cs) => cs.cart)
  products!: CartsProducts[];

  @OneToOne((type) => User, (user) => user.cart)
  @JoinColumn()
  user!: User;

  @BeforeInsert()
  startProducts() {
    this.products = [];
  }
}
