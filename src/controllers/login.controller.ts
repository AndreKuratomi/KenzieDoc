import { Request, Response } from "express";
import { LoginUserService } from "../services/login.service";

export class LoginController {
  async handle(req: Request, res: Response) {
    const login = new LoginUserService();
    const { email, password } = req.body;

    const token = await login.execute(email, password);
    return res.status(200).send({ token });
  }
}
