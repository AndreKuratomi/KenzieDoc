import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cart, Product } from ".";

@Entity()
export class CartsProducts {
  @PrimaryColumn()
  cartId!: string;

  @PrimaryColumn()
  productId!: string;

  @Column()
  productQuantity: number;

  @ManyToOne(() => Cart, (cart) => cart.products)
  @JoinColumn({ name: "cartId" })
  cart!: Cart;

  @ManyToOne(() => Product, (product) => product.carts)
  @JoinColumn({ name: "productId" })
  product!: Product;

  constructor(quantity: number) {
    this.productQuantity = quantity;
  }
}
