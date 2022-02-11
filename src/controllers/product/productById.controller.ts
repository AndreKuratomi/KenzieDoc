import { Request, Response } from "express";
import { ProductByIdService } from "../../services/product/productById.service";

export class ProductByIdController {
  async handle(req: Request, res: Response) {
    const productByIdService = new ProductByIdService();
    const { id } = req.params;

    try {
      const product = await productByIdService.execute(id);

      res.status(200).json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
