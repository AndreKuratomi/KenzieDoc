import { Response } from "express";
import { RegisterProductService } from "../../services/product/registerProduct.service";
import { IRequest } from "../../types";

export class RegisterProductController {
  async handle(req: IRequest, res: Response) {
    const registerProductService = new RegisterProductService();
    const data = req.body;
    const user = req.user;

    if (!user?.isAdm) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const newProduct = await registerProductService.execute(data);

      return res.status(201).json(newProduct);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
