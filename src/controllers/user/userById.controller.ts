import { Response } from "express";
import { UserByIdService } from "../../services/user/userById.service";
import { IRequest } from "../../types";

export class UserByIdController {
  async handle(req: IRequest, res: Response) {
    const userByIdService = new UserByIdService();
    const user = req.user;
    const { id } = req.params;

    if (user?.id !== id && !user?.isAdm) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = await userByIdService.execute(id);

      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
