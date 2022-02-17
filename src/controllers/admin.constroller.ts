import { Request, Response } from "express";
import {
  CreateAdminService,
  UpdateAdminService,
} from "../services/admin.service";

export class CreateAdminController {
  async handle(req: Request, res: Response) {
    const createAdminService = new CreateAdminService();
    const data = req.body;

    try {
      const admin = await createAdminService.execute(data);
      const { password, ...noPasswordData } = admin;

      return res.status(201).json(noPasswordData);
    } catch (err: any) {
      return res.status(400).json({ message: "E-mail already registered" });
    }
  }
}

export class UpdateAdminController {
  async handle(req: Request, res: Response) {
    const updateAdminService = new UpdateAdminService();
    const { id } = req.params;
    const data = req.body;

    try {
      const admin = await updateAdminService.execute(id, data);

      return res.status(200).json(admin);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
