import { Response } from "express";
import { ListUsersService } from "../../services/user/listUsers.service";
import { IRequest } from "../../types";

export class ListUsersController {
  async handle(req: IRequest, res: Response) {
    const listUsersService = new ListUsersService();
    const user = req.user;

    if (!user?.isAdm) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const usersList = await listUsersService.execute();

      return res.status(200).json(usersList);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
