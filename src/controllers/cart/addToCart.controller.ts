import { Response } from "express";
import { AddToCartService } from "../../services/cart/addToCart.service";
import { IRequest } from "../../types";

export class AddToCartController {
  async handle(req: IRequest, res: Response) {
    const addToCartService = new AddToCartService();
    const { productId, userId } = req.body;

    try {
      const cartProducts = await addToCartService.execute(productId, userId);

      res.status(200).json(cartProducts);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  }
}
