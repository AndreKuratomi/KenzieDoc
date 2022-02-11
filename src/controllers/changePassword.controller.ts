import { Request, Response } from "express";
import { ChangePasswordService } from "../services/changePassword.service";
import { IRequest } from "../types";

export class ChangePasswordController {
  async handle(req: IRequest, res: Response) {
    const changePasswordService = new ChangePasswordService();
    const { password, code } = req.body;

    try {
      const updatedUser = await changePasswordService.execute(code, password);

      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
