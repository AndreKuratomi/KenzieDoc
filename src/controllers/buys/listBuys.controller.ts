import { Request, Response } from "express";
import { ListBuysService } from "../../services/buys/listBuys.service";
import { IRequest } from "../../types";

export class ListBuysController {
  async handle(req: IRequest, res: Response) {
    const listBuysService = new ListBuysService();
    const user = req.user;

    if (!user!.isAdm) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const buysList = await listBuysService.execute();

    return res.status(200).json(buysList);
  }
}
