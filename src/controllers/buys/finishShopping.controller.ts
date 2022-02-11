import { Request, Response } from "express";
import { FinishShoppingService } from "../../services/buys/finishShopping.service";
import { IRequest } from "../../types";

export class FinishShoppingController {
  async handle(req: IRequest, res: Response) {
    const finishShoppingService = new FinishShoppingService();
    const user = req.user;

    try {
      const buy = await finishShoppingService.execute(user!.id);

      return res.status(200).json(buy);
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
}
