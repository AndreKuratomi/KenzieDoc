import { Request, Response } from "express";
import { SendEmailService } from "../services/sendEmail.service";
import nodemailer from "nodemailer";
import { IRequest } from "../types";

export class SendEmailController {
  async handle(req: IRequest, res: Response) {
    const sendEmailService = new SendEmailService();
    const { userId, subject, content } = req.body;
    const user = req.user;

    if (!user!.isAdm) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const email = await sendEmailService.execute(userId);

      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a70d827704c150",
          pass: "f0966f724a6254",
        },
      });

      const mailOptions = {
        from: "kenzie.market@org.com",
        to: email,
        subject: subject,
        text: content,
      };

      transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          return res.status(200).json({ message: err.message });
        } else {
          return res
            .status(200)
            .json({ message: `An e-mail has been sent to ${email}` });
        }
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
