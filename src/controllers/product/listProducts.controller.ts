import { Request, Response } from "express";
import { ListProductsService } from "../../services/product/listProducts.service";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    const listProductsService = new ListProductsService();

    const productsList = await listProductsService.execute();

    res.status(200).json(productsList);
  }
}
