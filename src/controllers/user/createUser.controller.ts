import e, { Request, Response } from "express";
import { CreateUserService } from "../../services/user/createUser.service";
import * as bcryptjs from "bcryptjs";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserService = new CreateUserService();
    const { name, password, email, isAdm } = req.body;

    try {
      const newUser = await createUserService.execute({
        name,
        passwordToHash: password,
        email,
        isAdm,
      });
      const { password: hashedPassword, ...dataWithoutPassword } = newUser;

      res.status(201).json(dataWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
