import { Request, Response } from "express";
import {
  CreateProfessionalService,
  DeleteProfessionalService,
  ProfessionalByIdService,
  ProfessionalsListService,
  UpdateProfessionalService,
} from "../services/professional.service";

export class CreateProfessionalController {
  async handle(req: Request, res: Response) {
    const createProfessionalService = new CreateProfessionalService();
    const data = req.body;

    try {
      const user = await createProfessionalService.execute(data);

      const { password, ...noPasswordData } = user;

      return res.status(201).json(noPasswordData);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export class ProfessionalsListController {
  async handle(req: Request, res: Response) {
    const professionalsListService = new ProfessionalsListService();

    try {
      const list = await professionalsListService.execute();

      return res.status(200).json(list);
    } catch (err: any) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
}

export class UpdateProfessionalController {
  async handle(req: Request, res: Response) {
    const updateProfessionalService = new UpdateProfessionalService();
    const { id } = req.params;
    const data = req.body;

    try {
      const user = await updateProfessionalService.execute(id, data);

      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export class DeleteProfessionalController {
  async handle(req: Request, res: Response) {
    const deleteProfessionalService = new DeleteProfessionalService();
    const { id } = req.params;

    try {
      const user = await deleteProfessionalService.execute(id);

      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export class ProfessionalByIdController {
  async handle(req: Request, res: Response) {
    const professionalByIdService = new ProfessionalByIdService();
    const { id } = req.params;

    try {
      const professional = await professionalByIdService.execute(id);

      return res.status(200).json(professional);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
