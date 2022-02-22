import { Request, Response } from "express";
import { createMail, sendPrescription } from "../services/email.service";

export class SendEmailController {
  async handle(req: Request, res: Response) {
    const data = req.body;

    try {
      await createMail(data);
      return res.json({ Status: "Email successfully sent!" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
