import { Request, Response } from "express";
import { ListCartsService } from "../../services/cart/listCarts.service";
import { IRequest } from "../../types";

export class ListCartsController {
  async handle(req: IRequest, res: Response) {
    const listCartsService = new ListCartsService();
    const user = req.user;

    if (!user?.isAdm) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cartsList = await listCartsService.execute();

    return res.status(200).json(cartsList);
  }
}
