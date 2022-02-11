import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Product } from "./entities";

export interface IUserParams {
  name: string;
  email: string;
  passwordToHash: string;
  isAdm: boolean;
}

export interface IProductParams {
  name: string;
  price: number;
}

export interface ICart {
  list: Product[];
  total: number;
}

export interface IDecoded extends JwtPayload {
  id?: string;
}

export interface IRequest extends Request {
  user?: {
    name: string;
    email: string;
    id: string;
    isAdm: boolean;
  };
}
