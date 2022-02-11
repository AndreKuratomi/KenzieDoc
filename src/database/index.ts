import { ConnectionOptions } from "typeorm";
import { Buys, Cart, Product, User, CartsProducts } from "../entities";
import { nodeEnv } from "../utils/config";

export const config: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "david",
  password: "Davidma23",
  database: nodeEnv === "test" ? "test_db" : "e6_kenzie_market",
  entities: [User, Product, Cart, Buys, CartsProducts],
  synchronize: true,
  logging: false,
};
