import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Product } from ".";

@Entity()
export class Buys {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToMany((type) => Product, (product) => product.buys, {
    cascade: true,
  })
  productsList: Product[];

  @Column("float")
  total: number;

  @CreateDateColumn()
  date!: Date;

  constructor(productsList: Product[], total: number) {
    this.productsList = productsList;
    this.total = total;
  }
}
