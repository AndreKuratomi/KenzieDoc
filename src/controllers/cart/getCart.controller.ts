import { Request, Response } from "express";
import { GetCartService } from "../../services/cart/getCart.service";
import { IRequest } from "../../types";

const config = {
  secret: "jdai3d@3rT5&",
  expiresIn: "24h",
};

export class GetCartController {
  async handle(req: IRequest, res: Response) {
    const getCartService = new GetCartService();
    const userId = req.params.userId;
    const user = req.user;

    if (userId !== user!.id && !user!.isAdm) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const cartProducts = await getCartService.execute(userId);

      res.status(200).json(cartProducts);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
