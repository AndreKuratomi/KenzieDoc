import { Response } from "express";
import { BuyByIdService } from "../../services/buys/buyById.service";
import { IRequest } from "../../types";

export class BuyByIdController {
  async handle(req: IRequest, res: Response) {
    const buyByIdService = new BuyByIdService();
    const { id } = req.params;
    // const userId = req.body.userId;
    // const user = req.user;
    // const userToFind = userId && user!.isAdm ? userId : user!.id;
    console.log(id);

    try {
      const buy = await buyByIdService.execute(id);

      res.status(200).json(buy);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
