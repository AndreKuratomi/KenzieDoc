import { Request, Response } from "express";
import { DeleteFromCartService } from "../../services/cart/deleteFromCart.service";
import { IRequest } from "../../types";
export class DeleteFromCartController {
  async handle(req: IRequest, res: Response) {
    const deleteFromCartService = new DeleteFromCartService();
    const productId = req.params.productId;
    const user = req.user;
    const userId: string = req.body.userId;
    const userToFind = userId && user!.isAdm ? userId : user!.id;

    try {
      const updatedCart = await deleteFromCartService.execute(
        userToFind,
        productId
      );

      res.status(200).json(updatedCart);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
