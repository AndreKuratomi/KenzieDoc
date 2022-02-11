import { Request, Response } from "express";
import { LoginUserService } from "../services/loginUser.service";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";

export class LoginUserController {
  async handle(req: Request, res: Response) {
    const loginUserService = new LoginUserService();
    const { email, password } = req.body;

    try {
      const user = await loginUserService.execute(email, password);
      const token = jwt.sign(
        { name: user.name, email: user.email, isAdm: user.isAdm, id: user.id },
        config.secret,
        {
          expiresIn: config.expiresIn,
        }
      );

      return res.status(200).json({ token: token });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
