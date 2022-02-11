import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Buys, Cart } from ".";
import { CartsProducts } from "./carts_products.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("float")
  price: number;

  @Column()
  name: string;

  @OneToMany(() => CartsProducts, (cs) => cs.product)
  carts!: CartsProducts[];

  @ManyToOne(() => Buys, (buys) => buys.productsList)
  buys!: Buys;

  constructor(price: number, name: string) {
    this.price = price;
    this.name = name;
  }
}
